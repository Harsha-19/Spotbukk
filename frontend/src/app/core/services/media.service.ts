import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { MediaItem, MediaLimits, MediaResponse } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl;

  // Reactive state
  readonly mediaItems = signal<MediaItem[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly isUploading = signal<boolean>(false);
  readonly uploadProgress = signal<number>(0);
  readonly limits = signal<MediaLimits | null>(null);

  constructor() {
    this.fetchLimits();
  }

  /**
   * Helper to build Bearer authorization headers
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.token() || localStorage.getItem('spotbukk_auth_token');
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  /**
   * Resolve relative upload paths to absolute backend server URLs
   */
  getMediaUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${this.apiUrl}${cleanUrl}`;
  }

  /**
   * Fetch system configurable limits
   */
  async fetchLimits(): Promise<MediaLimits | null> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ success: boolean; limits: MediaLimits }>(`${this.apiUrl}/api/media/limits`)
      );
      if (res && res.success && res.limits) {
        this.limits.set(res.limits);
        return res.limits;
      }
    } catch (e) {
      console.warn('Could not load media limits from server, using defaults');
    }
    return null;
  }

  /**
   * Get public media for a specific event
   */
  async getEventMedia(eventId: string): Promise<MediaItem[]> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.get<MediaResponse>(`${this.apiUrl}/api/media/event/${encodeURIComponent(eventId)}`)
      );
      if (res && res.success && res.media) {
        return res.media;
      }
      return [];
    } catch (err: any) {
      console.error('Failed to load event media:', err);
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get all media items for the currently authenticated host
   */
  async getMyMedia(): Promise<MediaItem[]> {
    this.isLoading.set(true);
    try {
      const headers = this.getAuthHeaders();
      const res = await firstValueFrom(
        this.http.get<MediaResponse>(`${this.apiUrl}/api/media/my`, { headers })
      );
      if (res && res.success && res.media) {
        this.mediaItems.set(res.media);
        return res.media;
      }
      return [];
    } catch (err: any) {
      console.error('Failed to load my media:', err);
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get all media for Admin moderation (including removed status)
   */
  async getAdminMedia(includeRemoved = true): Promise<MediaItem[]> {
    this.isLoading.set(true);
    try {
      const headers = this.getAuthHeaders();
      const res = await firstValueFrom(
        this.http.get<MediaResponse>(`${this.apiUrl}/api/media?includeRemoved=${includeRemoved}`, { headers })
      );
      if (res && res.success && res.media) {
        this.mediaItems.set(res.media);
        return res.media;
      }
      return [];
    } catch (err: any) {
      console.error('Failed to load admin media:', err);
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Upload photos and videos with real upload tracking
   */
  async uploadMedia(
    files: File[],
    metadata: { eventId?: string; eventTitle?: string; caption?: string }
  ): Promise<MediaItem[]> {
    if (!files || files.length === 0) {
      throw new Error('No files selected for upload');
    }

    this.isUploading.set(true);
    this.uploadProgress.set(5);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('media', file, file.name);
      });

      if (metadata.eventId) {
        formData.append('eventId', metadata.eventId);
      }
      if (metadata.eventTitle) {
        formData.append('eventTitle', metadata.eventTitle);
      }
      if (metadata.caption) {
        formData.append('caption', metadata.caption);
      }

      const headers = this.getAuthHeaders();

      // Observable to track progress
      const upload$ = new Observable<MediaResponse>((observer) => {
        this.http
          .post<MediaResponse>(`${this.apiUrl}/api/media/upload`, formData, {
            headers,
            reportProgress: true,
            observe: 'events'
          })
          .subscribe({
            next: (event) => {
              if (event.type === HttpEventType.UploadProgress && event.total) {
                const percent = Math.round((100 * event.loaded) / event.total);
                this.uploadProgress.set(Math.min(95, percent));
              } else if (event.type === HttpEventType.Response) {
                this.uploadProgress.set(100);
                observer.next(event.body || { success: true });
                observer.complete();
              }
            },
            error: (err) => {
              observer.error(err);
            }
          });
      });

      const res = await firstValueFrom(upload$);

      if (res && res.success && res.media) {
        // Prepend new media items into the active signal
        const updated = [...res.media, ...this.mediaItems()];
        this.mediaItems.set(updated);
        this.toast.success(
          'Upload Successful',
          `Published ${res.media.length} media file(s) to SpotBukk.`
        );
        return res.media;
      }

      throw new Error(res.error || 'Upload returned an unexpected response');
    } catch (err: any) {
      const errorMsg =
        err.error?.error || err.message || 'Media upload failed. Please try again.';
      this.toast.error('Upload Error', errorMsg);
      throw new Error(errorMsg);
    } finally {
      this.isUploading.set(false);
      setTimeout(() => this.uploadProgress.set(0), 1000);
    }
  }

  /**
   * Delete a media item (Host or Admin)
   */
  async deleteMedia(id: string): Promise<boolean> {
    try {
      const headers = this.getAuthHeaders();
      const res = await firstValueFrom(
        this.http.delete<{ success: boolean; message?: string }>(
          `${this.apiUrl}/api/media/${id}`,
          { headers }
        )
      );

      if (res && res.success) {
        // Remove locally from state
        this.mediaItems.update((items) => items.filter((m) => m.id !== id));
        this.toast.success('Media Removed', 'The file has been permanently deleted.');
        return true;
      }
      return false;
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to delete media item';
      this.toast.error('Deletion Failed', msg);
      return false;
    }
  }

  /**
   * Admin moderation: Remove or Restore visibility
   */
  async moderateMedia(
    id: string,
    action: 'remove' | 'restore',
    reason?: string
  ): Promise<MediaItem | null> {
    try {
      const headers = this.getAuthHeaders();
      const res = await firstValueFrom(
        this.http.patch<{ success: boolean; media: MediaItem }>(
          `${this.apiUrl}/api/media/${id}/moderate`,
          { action, reason },
          { headers }
        )
      );

      if (res && res.success && res.media) {
        // Update item in local list
        this.mediaItems.update((items) =>
          items.map((m) => (m.id === id ? res.media : m))
        );
        if (action === 'remove') {
          this.toast.success('Media Moderated', 'The media item was removed from public visibility.');
        } else {
          this.toast.success('Media Restored', 'The media item is now visible again.');
        }
        return res.media;
      }
      return null;
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Moderation action failed';
      this.toast.error('Moderation Error', msg);
      return null;
    }
  }
}

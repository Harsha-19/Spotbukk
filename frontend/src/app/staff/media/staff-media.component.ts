import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MediaService } from '../../core/services/media.service';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { MediaItem } from '../../core/models/media.model';
import { MediaUploadModalComponent } from '../../shared/components/media-upload-modal/media-upload-modal.component';

@Component({
  selector: 'app-staff-media',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MediaUploadModalComponent],
  template: `
    <div class="host-media-page container">
      <!-- Breadcrumb navigation -->
      <div class="top-nav-bar">
        <a routerLink="/staff" class="back-link">&larr; Back to Host Dashboard</a>
      </div>

      <!-- Page Header with prominent "Upload Photos & Videos" CTA -->
      <header class="page-header">
        <div class="header-content">
          <span class="editorial-kicker">SPOTBUKK &bull; HOST PORTAL</span>
          <h1 class="page-title">Host Photos & Videos</h1>
          <p class="page-subtitle">
            Upload and manage official imagery, guest moments, and audiovisual footage for your gatherings.
          </p>
        </div>

        <div class="header-actions">
          <!-- Mandatory clearly visible "Upload Photos & Videos" button -->
          <button
            type="button"
            id="btn-host-upload-media"
            class="btn btn-primary btn-lg upload-cta-btn"
            (click)="isUploadModalOpen.set(true)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Photos & Videos
          </button>
        </div>
      </header>

      <!-- Filter & Event Selector Toolbar -->
      <section class="toolbar-card card-base">
        <div class="toolbar-left">
          <div class="filter-group">
            <label class="filter-label" for="host-filter-event">Filter by Gathering:</label>
            <select
              id="host-filter-event"
              class="form-select"
              [(ngModel)]="selectedEventFilter"
              (change)="filterMedia()"
            >
              <option value="all">All Gatherings ({{ allItems().length }})</option>
              <option *ngFor="let ev of eventService.events()" [value]="ev.id">
                {{ ev.title }} ({{ ev.city }})
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label" for="host-filter-type">Media Type:</label>
            <div class="pill-filters">
              <button
                type="button"
                class="pill-btn"
                [class.active]="selectedTypeFilter === 'all'"
                (click)="selectedTypeFilter = 'all'; filterMedia()"
              >
                All
              </button>
              <button
                type="button"
                class="pill-btn"
                [class.active]="selectedTypeFilter === 'image'"
                (click)="selectedTypeFilter = 'image'; filterMedia()"
              >
                Photos
              </button>
              <button
                type="button"
                class="pill-btn"
                [class.active]="selectedTypeFilter === 'video'"
                (click)="selectedTypeFilter = 'video'; filterMedia()"
              >
                Videos
              </button>
            </div>
          </div>
        </div>

        <div class="toolbar-right">
          <button
            type="button"
            class="refresh-btn"
            (click)="loadMedia()"
            [disabled]="mediaService.isLoading()"
            title="Refresh Media Gallery"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              [class.spinning]="mediaService.isLoading()"
            >
              <path d="M23 4v6h-6"/>
              <path d="M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Refresh
          </button>
        </div>
      </section>

      <!-- Loading State -->
      <div *ngIf="mediaService.isLoading()" class="loading-state card-base">
        <div class="spinner"></div>
        <p>Loading your host uploads...</p>
      </div>

      <!-- Mandatory Empty State — Strictly NO Seed Data -->
      <div
        *ngIf="!mediaService.isLoading() && filteredItems().length === 0"
        class="empty-state card-base"
      >
        <div class="empty-icon-circle">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <h3 class="empty-title">No photos or videos uploaded yet.</h3>
        <p class="empty-desc">
          Capture high-fidelity moments and upload real atmosphere shots from your gathering. Uploaded assets will appear across SpotBukk gathering pages.
        </p>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          (click)="isUploadModalOpen.set(true)"
        >
          Upload Your First Photo or Video
        </button>
      </div>

      <!-- Real Uploads Media Grid -->
      <div
        *ngIf="!mediaService.isLoading() && filteredItems().length > 0"
        class="media-grid"
      >
        <div
          *ngFor="let item of filteredItems()"
          class="media-card card-base"
          [class.admin-removed]="item.isRemovedByAdmin"
        >
          <!-- Media Thumbnail / Video Preview -->
          <div class="media-thumb-container" (click)="openPreview(item)">
            <img
              *ngIf="item.mediaType === 'image'"
              [src]="mediaService.getMediaUrl(item.url)"
              [alt]="item.originalFilename"
              class="media-img"
              loading="lazy"
            />

            <div *ngIf="item.mediaType === 'video'" class="video-preview-wrapper">
              <video
                [src]="mediaService.getMediaUrl(item.url)"
                class="media-video-thumb"
                preload="metadata"
                muted
              ></video>
              <div class="video-play-indicator">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <span class="media-badge video-badge">VIDEO</span>
            </div>

            <!-- Removed Banner if moderated -->
            <div *ngIf="item.isRemovedByAdmin" class="removed-overlay">
              <span class="removed-tag">Removed by Admin</span>
            </div>

            <!-- Hover overlay -->
            <div class="hover-action-overlay">
              <span class="view-pill">Click to Preview</span>
            </div>
          </div>

          <!-- Metadata & Actions -->
          <div class="media-card-body">
            <div class="card-meta-top">
              <span class="event-tag" *ngIf="item.eventTitle">
                {{ item.eventTitle }}
              </span>
              <span class="event-tag general-tag" *ngIf="!item.eventTitle">
                General Experience
              </span>
              <span class="time-tag">{{ item.createdAt | date: 'mediumDate' }}</span>
            </div>

            <div class="card-file-row">
              <span class="filename" [title]="item.originalFilename">
                {{ item.originalFilename }}
              </span>
              <span class="filesize">{{ formatBytes(item.sizeBytes) }}</span>
            </div>

            <div class="removal-reason-box" *ngIf="item.isRemovedByAdmin">
              <strong>Admin Note:</strong> {{ item.removalReason || 'Content removed by curator.' }}
            </div>

            <!-- Delete Action -->
            <div class="card-actions-row">
              <button
                type="button"
                class="action-btn delete-btn"
                (click)="deleteMedia(item)"
                title="Delete this upload"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Delete Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox / Video Viewer Modal -->
      <div
        *ngIf="activePreviewItem()"
        class="lightbox-overlay"
        (click)="closePreview()"
      >
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close-btn" (click)="closePreview()">&times;</button>

          <div class="lightbox-media-wrapper">
            <img
              *ngIf="activePreviewItem()?.mediaType === 'image'"
              [src]="mediaService.getMediaUrl(activePreviewItem()?.url)"
              [alt]="activePreviewItem()?.originalFilename"
              class="lightbox-img"
            />

            <video
              *ngIf="activePreviewItem()?.mediaType === 'video'"
              [src]="mediaService.getMediaUrl(activePreviewItem()?.url)"
              class="lightbox-video"
              controls
              autoplay
            ></video>
          </div>

          <div class="lightbox-meta-bar">
            <div>
              <h4 class="lightbox-title">{{ activePreviewItem()?.originalFilename }}</h4>
              <p class="lightbox-sub">
                Event: {{ activePreviewItem()?.eventTitle || 'General Gathering' }} &bull;
                Uploaded by {{ activePreviewItem()?.userName }} on {{ activePreviewItem()?.createdAt | date: 'medium' }}
              </p>
            </div>
            <button
              type="button"
              class="btn btn-subtle btn-sm"
              (click)="deleteMedia(activePreviewItem()!); closePreview()"
            >
              Delete File
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Component -->
      <app-media-upload-modal
        [isOpen]="isUploadModalOpen()"
        (close)="isUploadModalOpen.set(false)"
        (uploadSuccess)="onUploadSuccess($event)"
      ></app-media-upload-modal>
    </div>
  `,
  styles: [`
    .host-media-page {
      padding: 36px 20px 80px;
      max-width: 1240px;
      margin: 0 auto;
    }

    .top-nav-bar {
      margin-bottom: 20px;
    }

    .back-link {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #cfa052;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .editorial-kicker {
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #cfa052;
      font-weight: 700;
      display: block;
      margin-bottom: 6px;
    }

    .page-title {
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 8px 0;
      letter-spacing: -0.02em;
    }

    .page-subtitle {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.65);
      margin: 0;
      max-width: 680px;
      line-height: 1.5;
    }

    .upload-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      font-size: 0.96rem;
      box-shadow: 0 6px 20px rgba(207, 160, 82, 0.25);
    }

    .toolbar-card {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 30px;
      background: rgba(255, 255, 255, 0.02);
    }

    .toolbar-left {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .filter-label {
      font-size: 0.82rem;
      color: rgba(255, 255, 255, 0.65);
      font-weight: 500;
    }

    .form-select {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #fff;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 0.85rem;
      outline: none;
    }

    .form-select:focus {
      border-color: #cfa052;
    }

    .pill-filters {
      display: flex;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 6px;
      padding: 3px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .pill-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.65);
      font-size: 0.8rem;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pill-btn.active {
      background: #cfa052;
      color: #0d0f14;
      font-weight: 600;
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.82rem;
      padding: 8px 14px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .refresh-btn:hover:not(:disabled) {
      border-color: #cfa052;
      color: #cfa052;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-state {
      padding: 60px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      color: rgba(255, 255, 255, 0.7);
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: #cfa052;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .empty-state {
      padding: 60px 30px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.015);
      border: 1px dashed rgba(255, 255, 255, 0.15);
    }

    .empty-icon-circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(207, 160, 82, 0.08);
      border: 1px solid rgba(207, 160, 82, 0.2);
      color: #cfa052;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      margin: 0;
    }

    .empty-desc {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      max-width: 520px;
      margin: 0;
      line-height: 1.5;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }

    .media-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
      background: #141720;
    }

    .media-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    }

    .media-card.admin-removed {
      border-color: rgba(239, 68, 68, 0.4);
      background: rgba(239, 68, 68, 0.03);
    }

    .media-thumb-container {
      position: relative;
      height: 180px;
      background: #000;
      cursor: pointer;
      overflow: hidden;
    }

    .media-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .media-card:hover .media-img {
      transform: scale(1.04);
    }

    .video-preview-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .media-video-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-play-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #cfa052;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }

    .media-card:hover .video-play-indicator {
      transform: translate(-50%, -50%) scale(1.1);
      background: rgba(207, 160, 82, 0.9);
      color: #000;
    }

    .media-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.06em;
    }

    .video-badge {
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
    }

    .removed-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(239, 68, 68, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .removed-tag {
      background: #ef4444;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .hover-action-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      opacity: 0;
      transition: opacity 0.2s;
      display: flex;
      justify-content: center;
    }

    .media-card:hover .hover-action-overlay {
      opacity: 1;
    }

    .view-pill {
      font-size: 0.72rem;
      color: #fff;
      background: rgba(255, 255, 255, 0.15);
      padding: 3px 10px;
      border-radius: 12px;
      backdrop-filter: blur(4px);
    }

    .media-card-body {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .card-meta-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .event-tag {
      font-size: 0.74rem;
      font-weight: 600;
      color: #cfa052;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .general-tag {
      color: rgba(255, 255, 255, 0.5);
    }

    .time-tag {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.45);
      flex-shrink: 0;
    }

    .card-file-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .filename {
      font-size: 0.82rem;
      color: #fff;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .filesize {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.45);
      flex-shrink: 0;
    }

    .removal-reason-box {
      font-size: 0.75rem;
      color: #fca5a5;
      background: rgba(239, 68, 68, 0.1);
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .card-actions-row {
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      justify-content: flex-end;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      font-size: 0.76rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.15s;
    }

    .delete-btn {
      color: rgba(255, 255, 255, 0.5);
    }

    .delete-btn:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    /* Lightbox Modal */
    .lightbox-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.92);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .lightbox-content {
      max-width: 900px;
      width: 100%;
      background: #11141c;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .lightbox-close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 1.6rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
    }

    .lightbox-media-wrapper {
      max-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      overflow: hidden;
    }

    .lightbox-img {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    .lightbox-video {
      max-width: 100%;
      max-height: 70vh;
      outline: none;
    }

    .lightbox-meta-bar {
      padding: 16px 20px;
      background: #141720;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .lightbox-title {
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      margin: 0 0 4px 0;
    }

    .lightbox-sub {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.55);
      margin: 0;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .toolbar-card {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class StaffMediaComponent implements OnInit {
  readonly mediaService = inject(MediaService);
  readonly eventService = inject(EventService);
  readonly authService = inject(AuthService);

  readonly isUploadModalOpen = signal<boolean>(false);
  readonly allItems = signal<MediaItem[]>([]);
  readonly filteredItems = signal<MediaItem[]>([]);
  readonly activePreviewItem = signal<MediaItem | null>(null);

  selectedEventFilter = 'all';
  selectedTypeFilter: 'all' | 'image' | 'video' = 'all';

  ngOnInit(): void {
    this.loadMedia();
  }

  async loadMedia(): Promise<void> {
    const list = await this.mediaService.getMyMedia();
    this.allItems.set(list);
    this.filterMedia();
  }

  filterMedia(): void {
    let list = this.allItems();

    if (this.selectedEventFilter !== 'all') {
      list = list.filter((m) => m.eventId === this.selectedEventFilter);
    }

    if (this.selectedTypeFilter !== 'all') {
      list = list.filter((m) => m.mediaType === this.selectedTypeFilter);
    }

    this.filteredItems.set(list);
  }

  onUploadSuccess(uploaded: MediaItem[]): void {
    this.loadMedia();
  }

  openPreview(item: MediaItem): void {
    this.activePreviewItem.set(item);
  }

  closePreview(): void {
    this.activePreviewItem.set(null);
  }

  async deleteMedia(item: MediaItem): Promise<void> {
    const confirmed = confirm(
      `Are you sure you want to permanently delete "${item.originalFilename}"?`
    );
    if (!confirmed) return;

    const ok = await this.mediaService.deleteMedia(item.id);
    if (ok) {
      this.allItems.update((prev) => prev.filter((m) => m.id !== item.id));
      this.filterMedia();
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}

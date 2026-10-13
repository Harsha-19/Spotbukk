import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../../../core/services/media.service';
import { EventService } from '../../../core/services/event.service';
import { EventItem } from '../../../core/models/event.model';
import { MediaItem } from '../../../core/models/media.model';

interface QueuedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  sizeFormatted: string;
  type: 'image' | 'video';
  previewUrl: string;
  error?: string;
}

@Component({
  selector: 'app-media-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onBackdropClick($event)">
      <div class="modal-container glass-panel card-base">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="header-titles">
            <span class="editorial-kicker">HOST PORTAL &bull; ASSET DISPATCH</span>
            <h2 class="modal-title">Upload Photos & Videos</h2>
            <p class="modal-subtitle">
              Publish authentic high-resolution moments, atmosphere clips, and soundscapes from your gathering.
            </p>
          </div>
          <button
            type="button"
            class="close-btn"
            (click)="closeModal()"
            [disabled]="mediaService.isUploading()"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <!-- Limits & Guidelines Banner -->
        <div class="guidelines-banner">
          <div class="guideline-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span><strong>Images:</strong> JPG, PNG, WebP (Up to 10 MB)</span>
          </div>
          <div class="guideline-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            <span><strong>Videos:</strong> MP4, WebM (Up to 50 MB)</span>
          </div>
          <div class="guideline-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span><strong>Multi-upload:</strong> Up to 10 files per batch</span>
          </div>
        </div>

        <!-- Event Selection -->
        <div class="event-selection-row">
          <label class="form-label" for="target-event-select">
            Target Gathering / Event:
            <span class="required-star">*</span>
          </label>
          <div class="select-wrapper">
            <select
              id="target-event-select"
              class="form-select"
              [(ngModel)]="selectedEventId"
              [disabled]="mediaService.isUploading() || !!fixedEventId"
              (change)="onEventChange()"
            >
              <option value="">-- General Gathering Moments (No specific event) --</option>
              <option *ngFor="let ev of availableEvents" [value]="ev.id">
                {{ ev.title }} ({{ ev.city }} &bull; {{ ev.date }})
              </option>
            </select>
          </div>
          <p class="field-hint" *ngIf="selectedEventTitle">
            Assigned to: <strong class="text-accent">{{ selectedEventTitle }}</strong>
          </p>
        </div>

        <!-- Drop Zone & File Selector -->
        <div
          class="drop-zone"
          [class.drag-over]="isDragging()"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
          (click)="fileInput.click()"
        >
          <input
            #fileInput
            type="file"
            id="host-media-file-input"
            class="hidden-file-input"
            multiple
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            (change)="onFileSelected($event)"
            [disabled]="mediaService.isUploading()"
          />

          <div class="drop-zone-content">
            <div class="icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div class="drop-instructions">
              <span class="instruction-primary">Click to browse or drag files here</span>
              <span class="instruction-sub">Select multiple photos or videos from your device</span>
            </div>
            <button
              type="button"
              class="btn btn-subtle btn-sm select-btn"
              (click)="$event.stopPropagation(); fileInput.click()"
              [disabled]="mediaService.isUploading()"
            >
              Choose Files
            </button>
          </div>
        </div>

        <!-- Validation Error Alert -->
        <div *ngIf="errorMessage()" class="alert-banner alert-error" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <div class="alert-content">
            <span>{{ errorMessage() }}</span>
          </div>
          <button class="alert-close" (click)="errorMessage.set('')">&times;</button>
        </div>

        <!-- Queued Files Preview List -->
        <div *ngIf="queuedFiles().length > 0" class="queued-section">
          <div class="queued-header">
            <span class="queued-count">
              Selected Files ({{ queuedFiles().length }})
            </span>
            <button
              type="button"
              class="clear-all-btn"
              (click)="clearQueue()"
              [disabled]="mediaService.isUploading()"
            >
              Remove All
            </button>
          </div>

          <div class="preview-grid">
            <div
              *ngFor="let item of queuedFiles(); let i = index"
              class="preview-card card-base"
              [class.has-error]="!!item.error"
            >
              <!-- Thumbnail / Video Badge -->
              <div class="thumb-wrapper">
                <img
                  *ngIf="item.type === 'image'"
                  [src]="item.previewUrl"
                  [alt]="item.name"
                  class="thumb-img"
                />
                <div *ngIf="item.type === 'video'" class="video-preview-box">
                  <video
                    [src]="item.previewUrl"
                    class="thumb-video"
                    muted
                    preload="metadata"
                  ></video>
                  <span class="video-pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    VIDEO
                  </span>
                </div>

                <button
                  type="button"
                  class="remove-item-btn"
                  (click)="removeQueuedItem(i)"
                  [disabled]="mediaService.isUploading()"
                  title="Remove file"
                  aria-label="Remove file"
                >
                  &times;
                </button>
              </div>

              <!-- Metadata -->
              <div class="file-details">
                <span class="file-name" [title]="item.name">{{ item.name }}</span>
                <span class="file-size">{{ item.sizeFormatted }}</span>
                <span *ngIf="item.error" class="file-error-text">{{ item.error }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Progress Indicator -->
        <div *ngIf="mediaService.isUploading()" class="upload-progress-box">
          <div class="progress-info-row">
            <span class="uploading-label">
              <span class="pulse-indicator"></span>
              Uploading media securely to SpotBukk server...
            </span>
            <span class="progress-percent">{{ mediaService.uploadProgress() }}%</span>
          </div>
          <div class="progress-track">
            <div
              class="progress-fill"
              [style.width.%]="mediaService.uploadProgress()"
            ></div>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-subtle"
            (click)="closeModal()"
            [disabled]="mediaService.isUploading()"
          >
            Cancel
          </button>

          <button
            type="button"
            class="btn btn-primary submit-upload-btn"
            (click)="submitUpload()"
            [disabled]="
              mediaService.isUploading() ||
              queuedFiles().length === 0 ||
              hasInvalidFiles()
            "
          >
            <span *ngIf="!mediaService.isUploading()">
              Confirm & Upload {{ queuedFiles().length }} File(s)
            </span>
            <span *ngIf="mediaService.isUploading()" class="btn-spinner-text">
              <span class="btn-spinner"></span>
              Uploading ({{ mediaService.uploadProgress() }}%)...
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      overflow-y: auto;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-container {
      background: #11141c;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      max-width: 760px;
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(207, 160, 82, 0.1);
      overflow: hidden;
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      padding: 24px 28px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }

    .editorial-kicker {
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #cfa052;
      font-weight: 700;
      display: block;
      margin-bottom: 6px;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 6px 0;
      letter-spacing: -0.01em;
    }

    .modal-subtitle {
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.65);
      margin: 0;
      line-height: 1.45;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-size: 1.5rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .close-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
      color: #cfa052;
      transform: scale(1.05);
    }

    .guidelines-banner {
      background: rgba(207, 160, 82, 0.06);
      border-bottom: 1px solid rgba(207, 160, 82, 0.15);
      padding: 12px 28px;
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
    }

    .guideline-item {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .guideline-item svg {
      color: #cfa052;
      flex-shrink: 0;
    }

    .event-selection-row {
      padding: 18px 28px 0;
    }

    .form-label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 6px;
    }

    .required-star {
      color: #e57373;
    }

    .select-wrapper {
      position: relative;
    }

    .form-select {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-select:focus {
      border-color: #cfa052;
      background: rgba(255, 255, 255, 0.07);
    }

    .field-hint {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.6);
      margin: 6px 0 0 0;
    }

    .text-accent {
      color: #cfa052;
    }

    .drop-zone {
      margin: 18px 28px;
      border: 2px dashed rgba(255, 255, 255, 0.18);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
      padding: 28px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .drop-zone:hover, .drop-zone.drag-over {
      border-color: #cfa052;
      background: rgba(207, 160, 82, 0.04);
    }

    .hidden-file-input {
      display: none;
    }

    .drop-zone-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .icon-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(207, 160, 82, 0.1);
      border: 1px solid rgba(207, 160, 82, 0.25);
      color: #cfa052;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .drop-instructions {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .instruction-primary {
      font-size: 0.96rem;
      font-weight: 600;
      color: #ffffff;
    }

    .instruction-sub {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.55);
    }

    .select-btn {
      margin-top: 4px;
      padding: 6px 16px;
      font-size: 0.82rem;
    }

    .alert-banner {
      margin: 0 28px 16px;
      padding: 12px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.85rem;
    }

    .alert-error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #fca5a5;
    }

    .alert-content {
      flex: 1;
    }

    .alert-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 1.2rem;
      cursor: pointer;
      line-height: 1;
    }

    .queued-section {
      padding: 0 28px 16px;
      max-height: 220px;
      overflow-y: auto;
    }

    .queued-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .queued-count {
      font-size: 0.84rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
    }

    .clear-all-btn {
      background: none;
      border: none;
      color: #f87171;
      font-size: 0.78rem;
      cursor: pointer;
      text-decoration: underline;
    }

    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 12px;
    }

    .preview-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .preview-card.has-error {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    .thumb-wrapper {
      position: relative;
      height: 90px;
      background: #000;
      overflow: hidden;
    }

    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumb-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-preview-box {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .video-pill {
      position: absolute;
      bottom: 6px;
      left: 6px;
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .remove-item-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
      border: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      font-size: 1rem;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s;
    }

    .remove-item-btn:hover {
      background: #ef4444;
    }

    .file-details {
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .file-name {
      font-size: 0.75rem;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .file-size {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .file-error-text {
      font-size: 0.68rem;
      color: #f87171;
    }

    .upload-progress-box {
      margin: 0 28px 16px;
      background: rgba(207, 160, 82, 0.08);
      border: 1px solid rgba(207, 160, 82, 0.2);
      border-radius: 8px;
      padding: 12px 16px;
    }

    .progress-info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.82rem;
    }

    .uploading-label {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pulse-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #cfa052;
      animation: pulseAnim 1.2s infinite;
    }

    @keyframes pulseAnim {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
    }

    .progress-percent {
      font-weight: 700;
      color: #cfa052;
    }

    .progress-track {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #cfa052, #e5b96f);
      transition: width 0.2s ease;
    }

    .modal-footer {
      padding: 18px 28px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      background: rgba(0, 0, 0, 0.2);
    }

    .submit-upload-btn {
      min-width: 180px;
    }

    .btn-spinner-text {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 640px) {
      .modal-container {
        max-height: 95vh;
      }
      .modal-header, .guidelines-banner, .event-selection-row, .drop-zone, .queued-section, .modal-footer {
        padding-left: 16px;
        padding-right: 16px;
      }
      .preview-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class MediaUploadModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() fixedEventId?: string;
  @Input() fixedEventTitle?: string;

  @Output() close = new EventEmitter<void>();
  @Output() uploadSuccess = new EventEmitter<MediaItem[]>();

  readonly mediaService = inject(MediaService);
  private readonly eventService = inject(EventService);

  readonly isDragging = signal<boolean>(false);
  readonly queuedFiles = signal<QueuedFile[]>([]);
  readonly errorMessage = signal<string>('');

  selectedEventId = '';
  selectedEventTitle = '';

  availableEvents: EventItem[] = [];

  ngOnInit(): void {
    this.availableEvents = this.eventService.events();
    if (this.fixedEventId) {
      this.selectedEventId = this.fixedEventId;
      this.selectedEventTitle = this.fixedEventTitle || '';
    }
  }

  onEventChange(): void {
    const found = this.availableEvents.find((e) => e.id === this.selectedEventId);
    this.selectedEventTitle = found ? found.title : '';
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && !this.mediaService.isUploading()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    if (this.mediaService.isUploading()) return;
    this.clearQueue();
    this.errorMessage.set('');
    this.close.emit();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (this.mediaService.isUploading()) return;

    if (event.dataTransfer && event.dataTransfer.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = ''; // Reset input so same file can be selected again
    }
  }

  private processFiles(files: File[]): void {
    this.errorMessage.set('');

    const maxImageSize = 10 * 1024 * 1024; // 10MB
    const maxVideoSize = 50 * 1024 * 1024; // 50MB
    const allowedImageExts = ['.jpg', '.jpeg', '.png', '.webp'];
    const allowedVideoExts = ['.mp4', '.webm'];

    const currentCount = this.queuedFiles().length;
    if (currentCount + files.length > 10) {
      this.errorMessage.set('You can upload a maximum of 10 files at once.');
      return;
    }

    const newQueued: QueuedFile[] = [];

    for (const file of files) {
      const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
      const isImg = allowedImageExts.includes(ext) || file.type.startsWith('image/');
      const isVid = allowedVideoExts.includes(ext) || file.type.startsWith('video/');

      if (!isImg && !isVid) {
        this.errorMessage.set(
          `File "${file.name}" has an unsupported format. Supported: JPG, PNG, WebP, MP4, WebM.`
        );
        continue;
      }

      let errorMsg: string | undefined;

      if (isImg && file.size > maxImageSize) {
        errorMsg = 'Exceeds 10MB image limit';
      } else if (isVid && file.size > maxVideoSize) {
        errorMsg = 'Exceeds 50MB video limit';
      }

      const queuedItem: QueuedFile = {
        id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        file,
        name: file.name,
        size: file.size,
        sizeFormatted: this.formatBytes(file.size),
        type: isVid ? 'video' : 'image',
        previewUrl: URL.createObjectURL(file),
        error: errorMsg
      };

      newQueued.push(queuedItem);
    }

    this.queuedFiles.update((items) => [...items, ...newQueued]);
  }

  removeQueuedItem(index: number): void {
    const list = [...this.queuedFiles()];
    const [removed] = list.splice(index, 1);
    if (removed && removed.previewUrl) {
      URL.revokeObjectURL(removed.previewUrl);
    }
    this.queuedFiles.set(list);
  }

  clearQueue(): void {
    this.queuedFiles().forEach((item) => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    this.queuedFiles.set([]);
  }

  hasInvalidFiles(): boolean {
    return this.queuedFiles().some((f) => !!f.error);
  }

  async submitUpload(): Promise<void> {
    const queue = this.queuedFiles();
    if (queue.length === 0 || this.hasInvalidFiles()) return;

    this.errorMessage.set('');

    try {
      const rawFiles = queue.map((q) => q.file);
      const uploaded = await this.mediaService.uploadMedia(rawFiles, {
        eventId: this.selectedEventId || undefined,
        eventTitle: this.selectedEventTitle || undefined
      });

      this.clearQueue();
      this.uploadSuccess.emit(uploaded);
      this.closeModal();
    } catch (err: any) {
      this.errorMessage.set(
        err.message || 'Upload could not be completed. Please check files and try again.'
      );
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}

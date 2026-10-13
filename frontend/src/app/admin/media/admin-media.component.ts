import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MediaService } from '../../core/services/media.service';
import { EventService } from '../../core/services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { MediaItem } from '../../core/models/media.model';

@Component({
  selector: 'app-admin-media',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-media-page">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <span class="editorial-kicker">CURATORIAL GOVERNANCE</span>
          <h1 class="page-title">Media Moderation & Governance</h1>
          <p class="page-sub">
            Review host-uploaded photos and videos across all gathering enclaves. Remove or moderate content at any time.
          </p>
        </div>

        <div class="header-actions">
          <button
            type="button"
            class="btn btn-subtle btn-sm refresh-btn"
            (click)="loadAllMedia()"
            [disabled]="mediaService.isLoading()"
          >
            <svg
              width="15"
              height="15"
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
            Refresh Feed
          </button>
        </div>
      </div>

      <!-- Moderation Stats Grid -->
      <section class="stats-grid" aria-label="Media Metrics">
        <div class="stat-card card-base">
          <span class="stat-title">TOTAL UPLOADS</span>
          <div class="stat-metric">{{ allItems().length }}</div>
          <span class="stat-sub">Across all registered hosts</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-title">ACTIVE PHOTOS</span>
          <div class="stat-metric">{{ activePhotoCount }}</div>
          <span class="stat-sub text-success">Visible on public pages</span>
        </div>

        <div class="stat-card card-base">
          <span class="stat-title">ACTIVE VIDEOS</span>
          <div class="stat-metric">{{ activeVideoCount }}</div>
          <span class="stat-sub text-success">Atmosphere footage</span>
        </div>

        <div class="stat-card card-base" [class.stat-alert]="removedCount > 0">
          <span class="stat-title">MODERATED / REMOVED</span>
          <div class="stat-metric text-danger">{{ removedCount }}</div>
          <span class="stat-sub">Hidden by administrator</span>
        </div>
      </section>

      <!-- Controls & Filter Toolbar -->
      <section class="admin-toolbar card-base">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="applyFilters()"
            placeholder="Search by host name, event title, or filename..."
            class="form-control"
          />
        </div>

        <div class="filter-controls">
          <div class="status-tabs">
            <button
              type="button"
              class="filter-tab"
              [class.active]="selectedStatusFilter === 'all'"
              (click)="selectedStatusFilter = 'all'; applyFilters()"
            >
              All ({{ allItems().length }})
            </button>
            <button
              type="button"
              class="filter-tab"
              [class.active]="selectedStatusFilter === 'active'"
              (click)="selectedStatusFilter = 'active'; applyFilters()"
            >
              Active ({{ activeCount }})
            </button>
            <button
              type="button"
              class="filter-tab tab-danger"
              [class.active]="selectedStatusFilter === 'removed'"
              (click)="selectedStatusFilter = 'removed'; applyFilters()"
            >
              Removed ({{ removedCount }})
            </button>
          </div>

          <div class="type-filter">
            <select
              class="form-select"
              [(ngModel)]="selectedTypeFilter"
              (change)="applyFilters()"
            >
              <option value="all">All Formats</option>
              <option value="image">Photos Only</option>
              <option value="video">Videos Only</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <div *ngIf="mediaService.isLoading()" class="loading-state card-base">
        <div class="spinner"></div>
        <p>Retrieving server media records...</p>
      </div>

      <!-- Empty State — Strictly NO Seed Data -->
      <div
        *ngIf="!mediaService.isLoading() && filteredItems().length === 0"
        class="empty-state card-base"
      >
        <div class="empty-icon-circle">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h3 class="empty-title">No photos or videos uploaded yet.</h3>
        <p class="empty-desc">
          When hosts upload photos or videos through the Host Portal, they will appear here with full moderation controls, file audit data, and instant removal authority.
        </p>
      </div>

      <!-- Moderation Media Grid -->
      <div
        *ngIf="!mediaService.isLoading() && filteredItems().length > 0"
        class="moderation-grid"
      >
        <div
          *ngFor="let item of filteredItems()"
          class="media-mod-card card-base"
          [class.moderated-card]="item.isRemovedByAdmin"
        >
          <!-- Thumbnail & Quick Preview -->
          <div class="card-visual-header" (click)="openPreview(item)">
            <img
              *ngIf="item.mediaType === 'image'"
              [src]="mediaService.getMediaUrl(item.url)"
              [alt]="item.originalFilename"
              class="mod-thumb-img"
              loading="lazy"
            />

            <div *ngIf="item.mediaType === 'video'" class="video-thumb-box">
              <video
                [src]="mediaService.getMediaUrl(item.url)"
                class="mod-thumb-video"
                preload="metadata"
                muted
              ></video>
              <div class="play-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <span class="media-type-badge">VIDEO</span>
            </div>

            <!-- Moderation Status Badge -->
            <div class="card-status-badge">
              <span
                class="status-pill"
                [class.pill-active]="!item.isRemovedByAdmin"
                [class.pill-removed]="item.isRemovedByAdmin"
              >
                {{ item.isRemovedByAdmin ? 'REMOVED BY ADMIN' : 'ACTIVE / PUBLISHED' }}
              </span>
            </div>

            <div class="hover-inspect-overlay">
              <span>Click to Inspect</span>
            </div>
          </div>

          <!-- Metadata & Audit Trail -->
          <div class="card-content-body">
            <!-- Event Association -->
            <div class="meta-row">
              <span class="meta-label">Gathering:</span>
              <span class="meta-val highlight-val" [title]="item.eventTitle || 'General Gathering'">
                {{ item.eventTitle || 'General Gathering' }}
              </span>
            </div>

            <!-- Host Information -->
            <div class="meta-row">
              <span class="meta-label">Uploaded By:</span>
              <div class="host-info">
                <strong class="host-name">{{ item.userName }}</strong>
                <span class="host-sub">{{ item.userEmail || item.userId }} &bull; {{ item.userRole }}</span>
              </div>
            </div>

            <!-- Technical File Details -->
            <div class="meta-row file-specs">
              <span class="meta-label">File Specs:</span>
              <span class="specs-val">
                {{ item.originalFilename }} ({{ formatBytes(item.sizeBytes) }}, {{ item.mimeType }})
              </span>
            </div>

            <!-- Upload Timestamp -->
            <div class="meta-row">
              <span class="meta-label">Timestamp:</span>
              <span class="specs-val">{{ item.createdAt | date: 'medium' }}</span>
            </div>

            <!-- Moderation Reason Box if Removed -->
            <div *ngIf="item.isRemovedByAdmin" class="removal-audit-box">
              <div class="audit-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Removed by: {{ item.removedBy }} on {{ item.removedAt | date: 'short' }}</span>
              </div>
              <p class="audit-reason">
                <strong>Reason:</strong> {{ item.removalReason }}
              </p>
            </div>

            <!-- Moderation Action Controls -->
            <div class="moderation-actions">
              <!-- Admin Remove Action -->
              <button
                *ngIf="!item.isRemovedByAdmin"
                type="button"
                class="btn btn-sm btn-danger-outline remove-action-btn"
                (click)="promptRemoveMedia(item)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
                Remove Media
              </button>

              <!-- Admin Restore Action -->
              <button
                *ngIf="item.isRemovedByAdmin"
                type="button"
                class="btn btn-sm btn-subtle restore-action-btn"
                (click)="restoreMedia(item)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Restore Visibility
              </button>

              <!-- Permanent Purge Action -->
              <button
                type="button"
                class="action-icon-btn delete-icon-btn"
                (click)="permanentDelete(item)"
                title="Permanently Delete File from Disk"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox & Inspection Modal -->
      <div
        *ngIf="inspectItem()"
        class="lightbox-overlay"
        (click)="inspectItem.set(null)"
      >
        <div class="lightbox-dialog glass-panel" (click)="$event.stopPropagation()">
          <button class="dialog-close" (click)="inspectItem.set(null)">&times;</button>

          <div class="dialog-media-container">
            <img
              *ngIf="inspectItem()?.mediaType === 'image'"
              [src]="mediaService.getMediaUrl(inspectItem()?.url)"
              [alt]="inspectItem()?.originalFilename"
              class="inspect-image"
            />
            <video
              *ngIf="inspectItem()?.mediaType === 'video'"
              [src]="mediaService.getMediaUrl(inspectItem()?.url)"
              class="inspect-video"
              controls
              autoplay
            ></video>
          </div>

          <div class="dialog-footer">
            <div class="dialog-meta">
              <h4>{{ inspectItem()?.originalFilename }}</h4>
              <p>
                Host: {{ inspectItem()?.userName }} ({{ inspectItem()?.userEmail }}) &bull;
                Gathering: {{ inspectItem()?.eventTitle || 'General' }} &bull;
                Status: {{ inspectItem()?.isRemovedByAdmin ? 'REMOVED' : 'ACTIVE' }}
              </p>
            </div>
            <div class="dialog-controls">
              <button
                *ngIf="!inspectItem()?.isRemovedByAdmin"
                type="button"
                class="btn btn-danger-outline btn-sm"
                (click)="promptRemoveMedia(inspectItem()!)"
              >
                Remove from Website
              </button>
              <button
                *ngIf="inspectItem()?.isRemovedByAdmin"
                type="button"
                class="btn btn-subtle btn-sm"
                (click)="restoreMedia(inspectItem()!)"
              >
                Restore Visibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-media-page {
      padding: 0 0 60px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
    }

    .editorial-kicker {
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #cfa052;
      font-weight: 700;
      display: block;
      margin-bottom: 4px;
    }

    .page-title {
      font-size: 1.85rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 6px 0;
      letter-spacing: -0.02em;
    }

    .page-sub {
      font-size: 0.92rem;
      color: rgba(255, 255, 255, 0.65);
      margin: 0;
    }

    .refresh-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      padding: 18px 20px;
      background: #141720;
    }

    .stat-title {
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.55);
      display: block;
      margin-bottom: 8px;
    }

    .stat-metric {
      font-size: 1.7rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .stat-sub {
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .text-success { color: #34d399; }
    .text-danger { color: #f87171; }

    .stat-alert {
      border-color: rgba(239, 68, 68, 0.3);
    }

    /* Toolbar */
    .admin-toolbar {
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 24px;
      background: #141720;
    }

    .search-box {
      flex: 1;
      min-width: 260px;
    }

    .form-control {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 0.88rem;
      outline: none;
    }

    .form-control:focus {
      border-color: #cfa052;
    }

    .filter-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .status-tabs {
      display: flex;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 6px;
      padding: 3px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .filter-tab {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.65);
      font-size: 0.8rem;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-tab.active {
      background: #cfa052;
      color: #0d0f14;
      font-weight: 600;
    }

    .filter-tab.tab-danger.active {
      background: #ef4444;
      color: #fff;
    }

    .form-select {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      padding: 7px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      outline: none;
    }

    .loading-state, .empty-state {
      padding: 60px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      background: #141720;
    }

    .empty-icon-circle {
      width: 70px;
      height: 70px;
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
      color: rgba(255, 255, 255, 0.55);
      max-width: 500px;
      margin: 0;
      line-height: 1.5;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: #cfa052;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    /* Moderation Grid */
    .moderation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .media-mod-card {
      background: #141720;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.2s;
    }

    .media-mod-card.moderated-card {
      border-color: rgba(239, 68, 68, 0.35);
      background: rgba(239, 68, 68, 0.02);
    }

    .card-visual-header {
      position: relative;
      height: 190px;
      background: #000;
      cursor: pointer;
      overflow: hidden;
    }

    .mod-thumb-img, .mod-thumb-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.25s;
    }

    .card-visual-header:hover .mod-thumb-img {
      transform: scale(1.04);
    }

    .video-thumb-box {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .play-icon-badge {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #cfa052;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .media-type-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
    }

    .card-status-badge {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .status-pill {
      font-size: 0.68rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.05em;
    }

    .pill-active {
      background: rgba(52, 211, 153, 0.2);
      color: #34d399;
      border: 1px solid rgba(52, 211, 153, 0.4);
    }

    .pill-removed {
      background: rgba(239, 68, 68, 0.25);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.5);
    }

    .hover-inspect-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      text-align: center;
      font-size: 0.72rem;
      color: #fff;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .card-visual-header:hover .hover-inspect-overlay {
      opacity: 1;
    }

    .card-content-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.82rem;
    }

    .meta-label {
      color: rgba(255, 255, 255, 0.5);
      flex-shrink: 0;
    }

    .meta-val {
      color: #fff;
      text-align: right;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    .highlight-val {
      color: #cfa052;
    }

    .host-info {
      text-align: right;
      display: flex;
      flex-direction: column;
    }

    .host-name {
      color: #fff;
    }

    .host-sub {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.45);
    }

    .specs-val {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.76rem;
      text-align: right;
      word-break: break-all;
    }

    .removal-audit-box {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: 6px;
      padding: 10px;
      font-size: 0.76rem;
      color: #fca5a5;
    }

    .audit-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .audit-reason {
      margin: 0;
      line-height: 1.4;
    }

    .moderation-actions {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .remove-action-btn {
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.35);
      background: rgba(239, 68, 68, 0.06);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .remove-action-btn:hover {
      background: #ef4444;
      color: #fff;
    }

    .restore-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      padding: 6px 12px;
    }

    .action-icon-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.4);
      padding: 6px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete-icon-btn:hover {
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
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .lightbox-dialog {
      max-width: 900px;
      width: 100%;
      background: #11141c;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }

    .dialog-close {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.75);
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

    .dialog-media-container {
      max-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
    }

    .inspect-image, .inspect-video {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    .dialog-footer {
      padding: 16px 20px;
      background: #141720;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .dialog-meta h4 {
      margin: 0 0 4px;
      font-size: 0.98rem;
      color: #fff;
    }

    .dialog-meta p {
      margin: 0;
      font-size: 0.78rem;
      color: rgba(255, 255, 255, 0.55);
    }

    .dialog-controls {
      display: flex;
      gap: 10px;
    }
  `]
})
export class AdminMediaComponent implements OnInit {
  readonly mediaService = inject(MediaService);
  readonly eventService = inject(EventService);
  readonly authService = inject(AuthService);

  readonly allItems = signal<MediaItem[]>([]);
  readonly filteredItems = signal<MediaItem[]>([]);
  readonly inspectItem = signal<MediaItem | null>(null);

  searchQuery = '';
  selectedStatusFilter: 'all' | 'active' | 'removed' = 'all';
  selectedTypeFilter: 'all' | 'image' | 'video' = 'all';

  get activeCount(): number {
    return this.allItems().filter((m) => !m.isRemovedByAdmin).length;
  }

  get removedCount(): number {
    return this.allItems().filter((m) => m.isRemovedByAdmin).length;
  }

  get activePhotoCount(): number {
    return this.allItems().filter((m) => !m.isRemovedByAdmin && m.mediaType === 'image').length;
  }

  get activeVideoCount(): number {
    return this.allItems().filter((m) => !m.isRemovedByAdmin && m.mediaType === 'video').length;
  }

  ngOnInit(): void {
    this.loadAllMedia();
  }

  async loadAllMedia(): Promise<void> {
    const list = await this.mediaService.getAdminMedia(true);
    this.allItems.set(list);
    this.applyFilters();
  }

  applyFilters(): void {
    let list = this.allItems();

    // Status filter
    if (this.selectedStatusFilter === 'active') {
      list = list.filter((m) => !m.isRemovedByAdmin);
    } else if (this.selectedStatusFilter === 'removed') {
      list = list.filter((m) => m.isRemovedByAdmin);
    }

    // Type filter
    if (this.selectedTypeFilter !== 'all') {
      list = list.filter((m) => m.mediaType === this.selectedTypeFilter);
    }

    // Search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          (m.eventTitle && m.eventTitle.toLowerCase().includes(q)) ||
          (m.userName && m.userName.toLowerCase().includes(q)) ||
          (m.originalFilename && m.originalFilename.toLowerCase().includes(q))
      );
    }

    this.filteredItems.set(list);
  }

  openPreview(item: MediaItem): void {
    this.inspectItem.set(item);
  }

  async promptRemoveMedia(item: MediaItem): Promise<void> {
    const defaultReason = 'Content violates community guidelines or quality standards.';
    const reason = prompt(
      `Remove "${item.originalFilename}" from SpotBukk? Enter moderation reason:`,
      defaultReason
    );

    if (reason === null) return; // User cancelled prompt

    const updated = await this.mediaService.moderateMedia(
      item.id,
      'remove',
      reason.trim() || defaultReason
    );

    if (updated) {
      this.allItems.update((prev) =>
        prev.map((m) => (m.id === item.id ? updated : m))
      );
      this.applyFilters();
      if (this.inspectItem()?.id === item.id) {
        this.inspectItem.set(updated);
      }
    }
  }

  async restoreMedia(item: MediaItem): Promise<void> {
    const confirmed = confirm(
      `Restore public visibility for "${item.originalFilename}"?`
    );
    if (!confirmed) return;

    const updated = await this.mediaService.moderateMedia(item.id, 'restore');
    if (updated) {
      this.allItems.update((prev) =>
        prev.map((m) => (m.id === item.id ? updated : m))
      );
      this.applyFilters();
      if (this.inspectItem()?.id === item.id) {
        this.inspectItem.set(updated);
      }
    }
  }

  async permanentDelete(item: MediaItem): Promise<void> {
    const confirmed = confirm(
      `PERMANENT REMOVAL: Are you sure you want to permanently delete "${item.originalFilename}" from storage and server disk? This action cannot be undone.`
    );
    if (!confirmed) return;

    const ok = await this.mediaService.deleteMedia(item.id);
    if (ok) {
      this.allItems.update((prev) => prev.filter((m) => m.id !== item.id));
      this.applyFilters();
      if (this.inspectItem()?.id === item.id) {
        this.inspectItem.set(null);
      }
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

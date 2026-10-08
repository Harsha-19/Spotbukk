import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { TicketTier } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="create-event-page container container-narrow">
      <div class="page-header">
        <a routerLink="/admin/events" class="back-link">&larr; Return to Events Inventory</a>
        <h1 class="page-title">Curate New Gathering</h1>
        <p class="page-sub">Configure scheduling, venue sanctuary parameters, and cryptographic admission tiers.</p>
      </div>

      <form (submit)="saveGathering($event, 'published')" class="create-form">
        <!-- 1. BASIC INFORMATION -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 01</span>
            <h3 class="section-heading">Basic Information & Narrative</h3>
          </div>

          <div class="form-group">
            <label for="evTitle">Event Name *</label>
            <input
              id="evTitle"
              type="text"
              class="form-control"
              [(ngModel)]="title"
              name="title"
              placeholder="e.g. VELVET FREQUENCIES"
              required
            />
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="evEdition">Edition / Volume *</label>
              <input
                id="evEdition"
                type="text"
                class="form-control"
                [(ngModel)]="edition"
                name="edition"
                placeholder="e.g. VOL. 01 · ROOFTOP SALON"
                required
              />
            </div>

            <div class="form-group">
              <label for="evCategory">Category</label>
              <select id="evCategory" class="form-control" [(ngModel)]="category" name="category">
                <option value="House Party">House Party</option>
                <option value="Rooftop Sessions">Rooftop Sessions</option>
                <option value="Intimate DJ">Intimate DJ</option>
                <option value="Private Gathering">Private Gathering</option>
                <option value="Pop-up Experience">Pop-up Experience</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="evSubtitle">Editorial Tagline</label>
            <input
              id="evSubtitle"
              type="text"
              class="form-control"
              [(ngModel)]="subtitle"
              name="subtitle"
              placeholder="e.g. Analog deep house, warm vinyl selections, and low-intervention natural wine."
            />
          </div>

          <div class="form-group">
            <label for="evDesc">Event Description & Atmosphere *</label>
            <textarea
              id="evDesc"
              class="form-control"
              rows="4"
              [(ngModel)]="description"
              name="description"
              placeholder="Detail the acoustic philosophy, lighting mood, bar curation, and room energy..."
              required
            ></textarea>
          </div>

          <!-- Hero Image -->
          <div class="form-group">
            <label for="heroImg">Hero Image URL</label>
            <input
              id="heroImg"
              type="text"
              class="form-control"
              [(ngModel)]="heroImage"
              name="heroImage"
              placeholder="https://images.unsplash.com/..."
            />
            <div class="preset-images-row">
              <span class="preset-label">Atmosphere Presets:</span>
              <button
                type="button"
                class="preset-btn"
                *ngFor="let p of imagePresets; let i = index"
                (click)="heroImage = p.url"
              >
                {{ p.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- 2. SCHEDULE & TIMING -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 02</span>
            <h3 class="section-heading">Schedule & Timing</h3>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="evDate">Event Date *</label>
              <input
                id="evDate"
                type="text"
                class="form-control"
                [(ngModel)]="date"
                name="date"
                placeholder="e.g. Saturday, 21 November 2026"
                required
              />
            </div>

            <div class="form-group">
              <label for="isoDate">Calendar Date (YYYY-MM-DD)</label>
              <input
                id="isoDate"
                type="date"
                class="form-control"
                [(ngModel)]="isoDate"
                name="isoDate"
              />
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="evTime">Event Time Span *</label>
              <input
                id="evTime"
                type="text"
                class="form-control"
                [(ngModel)]="time"
                name="time"
                placeholder="e.g. 9:00 PM – 3:30 AM"
                required
              />
            </div>

            <div class="form-group">
              <label for="doorsOpen">Doors Open</label>
              <input
                id="doorsOpen"
                type="text"
                class="form-control"
                [(ngModel)]="doorsOpen"
                name="doorsOpen"
                placeholder="e.g. 8:30 PM"
              />
            </div>
          </div>
        </div>

        <!-- 3. VENUE & ENCLAVE -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 03</span>
            <h3 class="section-heading">Venue & Location</h3>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="venueName">Venue Name *</label>
              <input
                id="venueName"
                type="text"
                class="form-control"
                [(ngModel)]="venue"
                name="venue"
                placeholder="e.g. The Sanctuary Terrace Loft"
                required
              />
            </div>

            <div class="form-group">
              <label for="citySelect">City *</label>
              <select id="citySelect" class="form-control" [(ngModel)]="city" name="city">
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Goa">Goa</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="venueAddress">Private Address (Disclosed 6hr prior) *</label>
            <input
              id="venueAddress"
              type="text"
              class="form-control"
              [(ngModel)]="address"
              name="address"
              placeholder="e.g. 80ft Road, Koramangala 4th Block, Bengaluru, KA"
              required
            />
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="capacity">Hard-Capped Capacity (Guests) *</label>
              <input
                id="capacity"
                type="number"
                class="form-control"
                [(ngModel)]="capacity"
                name="capacity"
                min="20"
                max="500"
                required
              />
            </div>

            <div class="form-group">
              <label for="ageLimit">Age Verification Protocol</label>
              <input
                id="ageLimit"
                type="text"
                class="form-control"
                [(ngModel)]="ageLimit"
                name="ageLimit"
              />
            </div>
          </div>
        </div>

        <!-- 4. TICKETS & ACCESS TIERS -->
        <div class="form-card card-base">
          <div class="card-section-header flex-between">
            <div>
              <span class="editorial-kicker">Section 04</span>
              <h3 class="section-heading">Admission Tiers Builder</h3>
            </div>
            <button type="button" class="btn btn-subtle btn-sm" (click)="addTier()">
              + Add Tier
            </button>
          </div>

          <div class="tiers-builder-list">
            <div class="tier-builder-card" *ngFor="let t of ticketTiers; let i = index">
              <div class="builder-top-row">
                <span class="tier-index">Tier 0{{ i + 1 }}</span>
                <button
                  type="button"
                  class="remove-tier-btn"
                  *ngIf="ticketTiers.length > 1"
                  (click)="removeTier(i)"
                >
                  &times; Remove
                </button>
              </div>

              <div class="form-row-3">
                <div class="form-group">
                  <label>Tier Name</label>
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="t.name"
                    [name]="'t_name_' + i"
                    placeholder="e.g. Regular Pass"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    class="form-control"
                    [(ngModel)]="t.price"
                    [name]="'t_price_' + i"
                    placeholder="699"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>Allocation Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    [(ngModel)]="t.totalQuantity"
                    [name]="'t_qty_' + i"
                    placeholder="60"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Tier Perks / Description</label>
                <input
                  type="text"
                  class="form-control"
                  [(ngModel)]="t.description"
                  [name]="'t_desc_' + i"
                  placeholder="Includes 1 welcome beverage and priority rooftop access"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 5. ETIQUETTE & HOUSE RULES -->
        <div class="form-card card-base">
          <div class="card-section-header">
            <span class="editorial-kicker">Section 05</span>
            <h3 class="section-heading">House Sanctuary Rules</h3>
          </div>

          <div class="form-group">
            <label for="dressCode">Dress Code Aesthetic</label>
            <input
              id="dressCode"
              type="text"
              class="form-control"
              [(ngModel)]="dressCode"
              name="dressCode"
              placeholder="e.g. Tailored Dark Neutrals / Atmospheric"
            />
          </div>

          <div class="form-group">
            <label for="rulesText">House Rules (One per line)</label>
            <textarea
              id="rulesText"
              class="form-control"
              rows="4"
              [(ngModel)]="rulesRaw"
              name="rulesRaw"
            ></textarea>
          </div>
        </div>

        <!-- Form Actions Footer -->
        <div class="form-actions-footer card-base glass-panel">
          <button
            type="button"
            class="btn btn-outline"
            (click)="saveGathering($event, 'draft')"
          >
            Save as Draft
          </button>
          <button type="submit" class="btn btn-primary btn-lg">
            Publish Event & Activate Guestlist
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-event-page {
      padding-bottom: 80px;
    }

    .page-header {
      margin-bottom: 32px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;
      display: inline-block;
      margin-bottom: 12px;

      &:hover {
        text-decoration: underline;
      }
    }

    .page-title {
      font-size: 2.2rem;
      margin-bottom: 6px;
    }

    .page-sub {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    .create-form {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .form-card {
      padding: 32px;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 20px;
      }
    }

    .card-section-header {
      margin-bottom: 24px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);

      &.flex-between {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .section-heading {
      font-size: 1.3rem;
    }

    .form-row-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    .form-row-3 {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 16px;

      @media (max-width: 680px) {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }

    .preset-images-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .preset-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .preset-btn {
      font-size: 0.75rem;
      padding: 4px 10px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);

      &:hover {
        border-color: var(--accent);
        color: var(--text-primary);
      }
    }

    /* Tiers Builder */
    .tiers-builder-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .tier-builder-card {
      padding: 20px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
    }

    .builder-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .tier-index {
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .remove-tier-btn {
      font-size: 0.75rem;
      color: var(--badge-error-text);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    /* Form Actions Footer */
    .form-actions-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      padding: 20px 32px;
      border-radius: var(--radius-md);
      position: sticky;
      bottom: 24px;
      z-index: 80;
    }
  `]
})
export class AdminCreateEventComponent {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  // Form Fields
  title = '';
  edition = 'VOL. 01';
  subtitle = 'An intimate gathering curated around analog sound and good company.';
  category: any = 'House Party';
  description = 'An unhurried late-night gathering hosted in a private architectural penthouse. Features custom analog sound tuning, bespoke botanicals, and curated company.';
  heroImage = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80';

  date = 'Friday, 28 November 2026';
  isoDate = '2026-11-28';
  time = '9:30 PM – 3:30 AM';
  doorsOpen = '9:00 PM';

  venue = 'The Glass Sanctuary Penthouse';
  address = 'Lavelle Road, Shanthala Nagar, Bengaluru, KA 560001';
  city: any = 'Bengaluru';
  capacity = 160;
  ageLimit = '21+';
  dressCode = 'Atmospheric / Tailored Dark Palette';

  rulesRaw = `Entry strictly 21+ with verified government photo proof.\nStrict no-flash photography policy in the listening salon.\nZero tolerance for harassment or disruptive demeanor.\nDoors lock at 01:30 AM.`;

  ticketTiers: TicketTier[] = [
    {
      id: 'tier-early',
      name: 'Early Bird',
      price: 599,
      description: 'Entry before 10:30 PM with 1 welcome signature spritz.',
      perks: ['Entry before 10:30 PM', '1 house beverage token'],
      totalQuantity: 40,
      availableQuantity: 40,
      badge: 'Limited'
    },
    {
      id: 'tier-regular',
      name: 'Regular Admission',
      price: 799,
      description: 'Anytime all-night admission pass.',
      perks: ['Anytime entry', 'Terrace access'],
      totalQuantity: 100,
      availableQuantity: 100,
      badge: 'Popular'
    }
  ];

  readonly imagePresets = [
    { label: 'Indiranagar Penthouse', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Clifftop Solarium', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Underground Loft', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80' },
    { label: 'Estate Garden', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80' }
  ];

  addTier(): void {
    const nextIdx = this.ticketTiers.length + 1;
    this.ticketTiers.push({
      id: 'tier-' + nextIdx,
      name: `VIP Access Tier ${nextIdx}`,
      price: 1199,
      description: 'Mezzanine lounge entry with 2 cocktail tokens.',
      perks: ['Priority lounge entry', '2 cocktails'],
      totalQuantity: 25,
      availableQuantity: 25
    });
  }

  removeTier(index: number): void {
    if (this.ticketTiers.length > 1) {
      this.ticketTiers.splice(index, 1);
    }
  }

  saveGathering(event: Event, status: 'published' | 'draft'): void {
    event.preventDefault();

    if (!this.title.trim() || !this.venue.trim()) {
      this.toast.error('Event title and venue name are mandatory.');
      return;
    }

    const rules = this.rulesRaw
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const startingPrice = Math.min(...this.ticketTiers.map(t => t.price));

    const created = this.eventService.createEvent({
      title: this.title.trim(),
      edition: this.edition.trim(),
      subtitle: this.subtitle.trim(),
      category: this.category,
      date: this.date.trim(),
      isoDate: this.isoDate,
      time: this.time.trim(),
      doorsOpen: this.doorsOpen.trim(),
      city: this.city,
      venue: this.venue.trim(),
      address: this.address.trim(),
      startingPrice,
      featured: false,
      status,
      availability: 'Available',
      ageLimit: this.ageLimit,
      dressCode: this.dressCode,
      capacity: Number(this.capacity),
      heroImage: this.heroImage,
      galleryImages: [this.heroImage],
      description: this.description.trim(),
      highlights: [
        'Curated 21+ crowd',
        'Bespoke acoustic sound tuning',
        'Artisanal beverage selections',
        'Digital pass verification'
      ],
      lineup: [
        { name: 'Resident Selector', role: 'Warmup & Groove', time: '10:00 PM – 12:30 AM' },
        { name: 'Headline Guest', role: 'Main Deep Set', time: '12:30 AM – Close' }
      ],
      ticketTiers: this.ticketTiers.map(t => ({
        ...t,
        availableQuantity: Number(t.totalQuantity)
      })),
      rules
    });

    this.toast.success(
      status === 'published' ? 'Gathering Published!' : 'Draft Saved',
      `${created.title} is now in your calendar.`
    );

    this.router.navigate(['/admin/events']);
  }
}

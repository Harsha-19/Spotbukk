import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService, CheckoutSession } from '../../core/services/event.service';
import { EventItem, TicketTier } from '../../core/models/event.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="registration-page container container-narrow" *ngIf="event">
      <!-- Breadcrumb & Top Indicator -->
      <div class="reg-top-bar">
        <a [routerLink]="['/events', event.id]" class="back-link">
          &larr; Back to {{ event.title }}
        </a>
        <span class="reg-step-indicator">Step {{ currentStep }} of 3</span>
      </div>

      <!-- Stepper Progress Header -->
      <div class="stepper-header card-base">
        <div class="step-node" [class.active]="currentStep === 1" [class.completed]="currentStep > 1" (click)="goToStep(1)">
          <span class="step-num">1</span>
          <span class="step-title">Select Pass</span>
        </div>
        <div class="step-line" [class.filled]="currentStep > 1"></div>
        <div class="step-node" [class.active]="currentStep === 2" [class.completed]="currentStep > 2" (click)="goToStep(2)">
          <span class="step-num">2</span>
          <span class="step-title">Attendee Details</span>
        </div>
        <div class="step-line" [class.filled]="currentStep > 2"></div>
        <div class="step-node" [class.active]="currentStep === 3">
          <span class="step-num">3</span>
          <span class="step-title">Review Order</span>
        </div>
      </div>

      <!-- STEP 1: Pass & Quantity Confirmation -->
      <div class="step-card card-base" *ngIf="currentStep === 1">
        <div class="step-card-header">
          <span class="editorial-kicker">Step 01</span>
          <h2 class="step-heading">Confirm Ticket Tier & Quantity</h2>
          <p class="step-desc">Select the admission category best matched to your party.</p>
        </div>

        <div class="tiers-list">
          <div
            *ngFor="let tier of event.ticketTiers"
            class="tier-box"
            [class.active]="selectedTier?.id === tier.id"
            [class.disabled]="tier.availableQuantity === 0"
            (click)="selectTier(tier)"
          >
            <div class="tier-box-left">
              <div class="tier-select-circle"></div>
              <div>
                <h4 class="tier-box-title">{{ tier.name }}</h4>
                <p class="tier-box-desc">{{ tier.description }}</p>
                <div class="tier-perks-row">
                  <span class="perk-badge" *ngFor="let p of tier.perks">{{ p }}</span>
                </div>
              </div>
            </div>
            <div class="tier-box-right">
              <span class="tier-box-price">₹{{ tier.price }}</span>
              <span class="tier-box-status" *ngIf="tier.availableQuantity > 0">
                {{ tier.availableQuantity }} left
              </span>
              <span class="tier-box-status text-danger" *ngIf="tier.availableQuantity === 0">
                Sold Out
              </span>
            </div>
          </div>
        </div>

        <!-- Quantity row -->
        <div class="qty-select-bar" *ngIf="selectedTier">
          <div>
            <span class="qty-title">Number of Attendees</span>
            <span class="qty-hint">Each ticket pass requires full name verification at check-in.</span>
          </div>
          <div class="qty-controls">
            <button class="btn btn-subtle btn-sm" (click)="decreaseQty()" [disabled]="quantity <= 1">&minus;</button>
            <span class="qty-count">{{ quantity }}</span>
            <button class="btn btn-subtle btn-sm" (click)="increaseQty()" [disabled]="quantity >= 6">&#43;</button>
          </div>
        </div>

        <div class="step-nav-footer">
          <div></div>
          <button class="btn btn-primary" (click)="goToStep(2)" [disabled]="!selectedTier">
            Proceed to Details &rarr;
          </button>
        </div>
      </div>

      <!-- STEP 2: Guest Details & Optional Requests -->
      <div class="step-card card-base" *ngIf="currentStep === 2">
        <div class="step-card-header">
          <span class="editorial-kicker">Step 02</span>
          <h2 class="step-heading">Attendee Verification</h2>
          <p class="step-desc">
            Passes are strictly vetted. Ensure names match government photo ID.
          </p>
        </div>

        <form (submit)="onAttendeeSubmit($event)">
          <!-- Primary Attendee -->
          <div class="form-section-title">Primary Attendee (Booking Holder)</div>
          
          <div class="form-group">
            <label for="fullName">Full Name (As on Photo ID) *</label>
            <input
              id="fullName"
              type="text"
              class="form-control"
              [(ngModel)]="primaryName"
              name="primaryName"
              placeholder="e.g. Rohan Mehra"
              required
            />
            <div class="form-error" *ngIf="submitted && !primaryName.trim()">
              Full name is mandatory for 21+ entry.
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input
                id="email"
                type="email"
                class="form-control"
                [(ngModel)]="primaryEmail"
                name="primaryEmail"
                placeholder="name@example.com"
                required
              />
              <span class="form-hint">Digital pass and gate secrets sent here.</span>
              <div class="form-error" *ngIf="submitted && (!primaryEmail.trim() || !primaryEmail.includes('@'))">
                A valid email address is required.
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone / WhatsApp Number *</label>
              <input
                id="phone"
                type="tel"
                class="form-control"
                [(ngModel)]="primaryPhone"
                name="primaryPhone"
                placeholder="+91 98450 18239"
                required
              />
              <span class="form-hint">For day-of door coordination and emergency updates.</span>
              <div class="form-error" *ngIf="submitted && !primaryPhone.trim()">
                Contact number is required.
              </div>
            </div>
          </div>

          <!-- Additional Attendees (if quantity > 1) -->
          <div *ngIf="quantity > 1" class="additional-guests-block">
            <div class="form-section-title">Additional Guest Names</div>
            <p class="section-microcopy">
              Enter names for the remaining {{ quantity - 1 }} guest{{ quantity > 2 ? 's' : '' }}.
            </p>

            <div class="form-group" *ngFor="let g of additionalGuests; let i = index; trackBy: trackByIndex">
              <label>Guest {{ i + 2 }} Full Name</label>
              <input
                type="text"
                class="form-control"
                [(ngModel)]="additionalGuests[i]"
                [name]="'guest_' + i"
                placeholder="Guest Full Name"
              />
            </div>
          </div>

          <!-- Special Requests / Dietary / Notes -->
          <div class="form-group">
            <label for="specialRequests">Special Requests / Notes (Optional)</label>
            <textarea
              id="specialRequests"
              class="form-control"
              rows="3"
              [(ngModel)]="specialRequests"
              name="specialRequests"
              placeholder="Allergies, arrival time, celebrating a birthday, or specific music preferences..."
            ></textarea>
          </div>

          <div class="step-nav-footer">
            <button type="button" class="btn btn-outline" (click)="goToStep(1)">
              &larr; Back
            </button>
            <button type="submit" class="btn btn-primary">
              Review Summary &rarr;
            </button>
          </div>
        </form>
      </div>

      <!-- STEP 3: Order Review & Confirmation -->
      <div class="step-card card-base" *ngIf="currentStep === 3">
        <div class="step-card-header">
          <span class="editorial-kicker">Step 03</span>
          <h2 class="step-heading">Review Gathering Registration</h2>
          <p class="step-desc">Verify your information before proceeding to payment.</p>
        </div>

        <div class="review-grid">
          <!-- Gathering Summary -->
          <div class="review-box card-base">
            <div class="review-box-header">Gathering Summary</div>
            <div class="review-event-line">
              <img [src]="event.heroImage" [alt]="event.title" class="review-event-thumb" />
              <div>
                <h4 class="review-event-title">{{ event.title }} <small>{{ event.edition }}</small></h4>
                <p class="review-event-meta">{{ event.date }} · {{ event.time }}</p>
                <p class="review-event-venue">{{ event.venue }}, {{ event.city }}</p>
              </div>
            </div>
          </div>

          <!-- Attendee Summary -->
          <div class="review-box card-base">
            <div class="review-box-header">Primary Guest Details</div>
            <div class="review-details-list">
              <div class="detail-row">
                <span class="lbl">Primary Attendee:</span>
                <span class="val">{{ primaryName }}</span>
              </div>
              <div class="detail-row">
                <span class="lbl">Email:</span>
                <span class="val">{{ primaryEmail }}</span>
              </div>
              <div class="detail-row">
                <span class="lbl">Phone:</span>
                <span class="val">{{ primaryPhone }}</span>
              </div>
              <div class="detail-row" *ngIf="additionalGuests.length > 0">
                <span class="lbl">Guests:</span>
                <span class="val">{{ additionalGuests.join(', ') }}</span>
              </div>
              <div class="detail-row" *ngIf="specialRequests">
                <span class="lbl">Special Notes:</span>
                <span class="val">{{ specialRequests }}</span>
              </div>
            </div>
          </div>

          <!-- Cost Breakdown -->
          <div class="review-box card-base">
            <div class="review-box-header">Financial Summary</div>
            <div class="cost-table">
              <div class="cost-row">
                <span>{{ selectedTier?.name }} &times; {{ quantity }}</span>
                <span>₹{{ subtotal }}</span>
              </div>
              <div class="cost-row">
                <span>Convenience & Verification Fee</span>
                <span>₹{{ convenienceFee }}</span>
              </div>
              <div class="cost-total-row">
                <span>Total Due</span>
                <span class="cost-total-amount">₹{{ totalAmount }}</span>
              </div>
            </div>
          </div>

          <!-- Consent Checkbox -->
          <div class="consent-block">
            <label class="consent-label">
              <input type="checkbox" [(ngModel)]="termsAccepted" />
              <span>
                I confirm all attendees are 21+ with government photo identification. I agree to the SpotBukk house etiquette and no-flash policy.
              </span>
            </label>
            <div class="form-error" *ngIf="submitted && !termsAccepted">
              You must agree to the house guidelines to proceed.
            </div>
          </div>
        </div>

        <div class="step-nav-footer">
          <button type="button" class="btn btn-outline" (click)="goToStep(2)">
            &larr; Edit Details
          </button>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            (click)="proceedToPayment()"
            [disabled]="!termsAccepted"
          >
            Continue to Payment (₹{{ totalAmount }}) &rarr;
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .registration-page {
      padding: 48px 24px 80px;
    }

    .reg-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }

    .reg-step-indicator {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
    }

    /* Stepper Header */
    .stepper-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-radius: var(--radius-md);
      margin-bottom: 36px;

      @media (max-width: 600px) {
        padding: 14px 16px;
      }
    }

    .step-node {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity var(--transition-fast);

      &.active {
        opacity: 1;

        .step-num {
          background: var(--accent);
          color: var(--accent-text);
          border-color: var(--accent);
        }

        .step-title {
          color: var(--text-primary);
          font-weight: 700;
        }
      }

      &.completed {
        opacity: 0.85;

        .step-num {
          background: var(--bg-surface-elevated);
          color: var(--accent);
          border-color: var(--accent);
        }
      }
    }

    .step-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--border-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
    }

    .step-title {
      font-family: var(--font-display);
      font-size: 0.84rem;
      color: var(--text-secondary);

      @media (max-width: 600px) {
        display: none;
      }
    }

    .step-line {
      flex: 1;
      height: 1px;
      background: var(--border-subtle);
      margin: 0 16px;

      &.filled {
        background: var(--accent);
      }
    }

    /* Step Card */
    .step-card {
      padding: 36px;
      border-radius: var(--radius-lg);

      @media (max-width: 600px) {
        padding: 24px 18px;
      }
    }

    .step-card-header {
      margin-bottom: 32px;
    }

    .step-heading {
      font-size: 1.6rem;
      margin-bottom: 6px;
    }

    .step-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    /* Tiers Box */
    .tiers-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 28px;
    }

    .tier-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover:not(.disabled) {
        border-color: var(--border-medium);
      }

      &.active {
        border-color: var(--accent);
        background: var(--bg-surface-elevated);

        .tier-select-circle {
          background: var(--accent);
          border-color: var(--accent);
        }
      }

      &.disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }
    }

    .tier-box-left {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .tier-select-circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid var(--border-medium);
      margin-top: 3px;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }

    .tier-box-title {
      font-family: var(--font-display);
      font-size: 1.05rem;
      margin-bottom: 4px;
    }

    .tier-box-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .tier-perks-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .perk-badge {
      font-size: 0.72rem;
      padding: 2px 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
    }

    .tier-box-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      @media (max-width: 640px) {
        align-items: flex-start;
      }
    }

    .tier-box-price {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 800;
    }

    .tier-box-status {
      font-size: 0.75rem;
      color: var(--text-muted);

      &.text-danger {
        color: var(--badge-error-text);
      }
    }

    /* Qty Bar */
    .qty-select-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-md);
      margin-bottom: 32px;

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
      }
    }

    .qty-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      display: block;
    }

    .qty-hint {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .qty-count {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      min-width: 24px;
      text-align: center;
    }

    /* Forms */
    .form-section-title {
      font-family: var(--font-display);
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-primary);
      margin: 24px 0 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .section-microcopy {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 16px;
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

    /* Step 3 Review */
    .review-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 32px;
    }

    .review-box {
      padding: 20px;
      border-radius: var(--radius-md);
    }

    .review-box-header {
      font-family: var(--font-display);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-bottom: 14px;
      font-weight: 700;
    }

    .review-event-line {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .review-event-thumb {
      width: 72px;
      height: 72px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }

    .review-event-title {
      font-size: 1.15rem;
      margin-bottom: 4px;

      small {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
    }

    .review-event-meta,
    .review-event-venue {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .review-details-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .detail-row {
      display: flex;
      font-size: 0.85rem;

      .lbl {
        width: 140px;
        color: var(--text-muted);
        flex-shrink: 0;
      }

      .val {
        color: var(--text-primary);
        font-weight: 500;
      }
    }

    .cost-table {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.88rem;
    }

    .cost-row {
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary);
    }

    .cost-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
      font-weight: 700;
      color: var(--text-primary);
    }

    .cost-total-amount {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--text-primary);
    }

    .consent-block {
      padding: 16px;
      background: var(--bg-surface-subtle);
      border-radius: var(--radius-sm);
      margin-top: 8px;
    }

    .consent-label {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.5;
      cursor: pointer;

      input {
        margin-top: 3px;
        accent-color: var(--accent);
      }
    }

    .step-nav-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 28px;
      border-top: 1px solid var(--border-subtle);
      margin-top: 24px;
    }
  `]
})
export class RegistrationComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);
  private readonly toast = inject(ToastService);

  event?: EventItem;
  selectedTier?: TicketTier;
  quantity = 1;

  currentStep = 1;
  submitted = false;

  // Form fields
  primaryName = '';
  primaryEmail = '';
  primaryPhone = '';
  additionalGuests: string[] = [];
  specialRequests = '';
  termsAccepted = false;

  get subtotal(): number {
    if (!this.selectedTier) return 0;
    return this.selectedTier.price * this.quantity;
  }

  get convenienceFee(): number {
    return Math.round(this.subtotal * 0.05);
  }

  get totalAmount(): number {
    return this.subtotal + this.convenienceFee;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.event = this.eventService.getEventById(id);
        if (this.event) {
          // Check if checkout session exists
          const session = this.eventService.activeCheckoutSession();
          if (session && session.event.id === this.event.id) {
            this.selectedTier = session.tier;
            this.quantity = session.quantity;
            this.primaryName = session.attendee.fullName;
            this.primaryEmail = session.attendee.email;
            this.primaryPhone = session.attendee.phone;
            this.additionalGuests = [...session.additionalGuests];
            this.specialRequests = session.specialRequests || '';
            // If details already provided, jump to step 2
            if (this.selectedTier) {
              this.currentStep = 2;
            }
          } else {
            this.selectedTier = this.event.ticketTiers[0];
            this.syncAdditionalGuests();
          }
        }
      }
    });
  }

  selectTier(tier: TicketTier): void {
    if (tier.availableQuantity === 0) return;
    this.selectedTier = tier;
  }

  increaseQty(): void {
    if (this.quantity < 6) {
      this.quantity++;
      this.syncAdditionalGuests();
    }
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.syncAdditionalGuests();
    }
  }

  syncAdditionalGuests(): void {
    const required = Math.max(0, this.quantity - 1);
    while (this.additionalGuests.length < required) {
      this.additionalGuests.push('');
    }
    if (this.additionalGuests.length > required) {
      this.additionalGuests = this.additionalGuests.slice(0, required);
    }
  }

  goToStep(step: number): void {
    if (step === 2 && !this.selectedTier) {
      this.toast.error('Please select an admission pass first.');
      return;
    }
    if (step === 3 && (!this.primaryName.trim() || !this.primaryEmail.trim() || !this.primaryPhone.trim())) {
      this.submitted = true;
      this.toast.error('Please complete all required attendee fields.');
      return;
    }
    this.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onAttendeeSubmit(e: Event): void {
    e.preventDefault();
    this.submitted = true;

    if (!this.primaryName.trim() || !this.primaryEmail.trim() || !this.primaryPhone.trim()) {
      this.toast.error('Please fill in required fields.');
      return;
    }

    this.goToStep(3);
  }

  proceedToPayment(): void {
    if (!this.event || !this.selectedTier) return;
    if (!this.termsAccepted) {
      this.submitted = true;
      this.toast.warning('Please agree to house etiquette before proceeding.');
      return;
    }

    const session: CheckoutSession = {
      event: this.event,
      tier: this.selectedTier,
      quantity: this.quantity,
      attendee: {
        fullName: this.primaryName.trim(),
        email: this.primaryEmail.trim(),
        phone: this.primaryPhone.trim()
      },
      additionalGuests: this.additionalGuests.filter(g => g.trim().length > 0),
      specialRequests: this.specialRequests.trim(),
      subtotal: this.subtotal,
      convenienceFee: this.convenienceFee,
      total: this.totalAmount
    };

    this.eventService.setCheckoutSession(session);
    this.router.navigate(['/checkout']);
  }

  trackByIndex(index: number): number {
    return index;
  }
}

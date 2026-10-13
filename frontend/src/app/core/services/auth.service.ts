import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, OtpResponse } from '../models/user.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly apiUrl = environment.apiUrl;

  private readonly TOKEN_STORAGE_KEY = 'spotbukk_auth_token';
  private readonly USER_STORAGE_KEY = 'spotbukk_auth_user';

  readonly currentUser = signal<User | null>(null);
  readonly token = signal<string | null>(null);
  readonly isLoading = signal<boolean>(false);

  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');
  readonly isStaff = computed(() => this.currentUser()?.role === 'STAFF');
  readonly canAccessStaff = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'STAFF' || role === 'ADMIN';
  });
  readonly isEndUser = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'END_USER' || role === 'USER' || role === 'CUSTOMER';
  });
  readonly isUser = computed(() => this.isEndUser());

  constructor() {
    this.restoreSession();
  }

  /**
   * Restores user session from storage and validates token with backend.
   * Never automatically authenticates guests as Admin.
   */
  private async restoreSession(): Promise<void> {
    const storedToken = localStorage.getItem(this.TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(this.USER_STORAGE_KEY);

    if (!storedToken) {
      return;
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as User;
        this.token.set(storedToken);
        this.currentUser.set(parsed);
      } catch {
        this.clearSession();
        return;
      }
    }

    // Verify token with backend /api/auth/me
    try {
      const headers = new HttpHeaders({ Authorization: `Bearer ${storedToken}` });
      const res = await firstValueFrom(
        this.http.get<{ success: boolean; user: User }>(`${this.apiUrl}/api/auth/me`, { headers })
      );

      if (res && res.success && res.user) {
        this.saveSession(storedToken, res.user);
      } else {
        this.clearSession();
      }
    } catch (err: any) {
      // If token expired or rejected by server (401/403), invalidate session
      if (err.status === 401 || err.status === 403) {
        this.clearSession();
      }
      // If server unreachable, keep restored user but log note
    }
  }

  /**
   * Option 1: Continue with Google (End User)
   */
  async loginWithGoogle(credential?: string): Promise<User> {
    this.isLoading.set(true);
    try {
      if (typeof credential !== 'string' || !credential.trim()) {
        throw new Error('Google did not provide an ID token. Please try signing in again.');
      }

      // The backend verifies the signed Google ID token; profile fields from the browser are not trusted.
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/google`, { credential })
      );

      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        this.toast.success('Welcome!', `Signed in with Google as ${res.user.fullName || res.user.name}`);
        return res.user;
      }
      throw new Error(res.error || 'Google authentication failed');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Google authentication failed';
      this.toast.error('Authentication Error', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 2: Phone OTP — Request Verification Code
   */
  async sendPhoneOtp(phone: string): Promise<OtpResponse> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<OtpResponse>(`${this.apiUrl}/api/auth/phone/send-otp`, { phone })
      );
      if (res && res.success) {
        this.toast.info('Verification Code Sent', res.message || 'Check your SMS for the 6-digit code.');
        return res;
      }
      throw new Error(res.error || 'Failed to send verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to send phone OTP';
      this.toast.error('SMS Error', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 2: Phone OTP — Verify Code & Sign In
   */
  async verifyPhoneOtp(phone: string, otp: string): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/phone/verify-otp`, { phone, otp })
      );
      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        this.toast.success('Verified', `Signed in successfully with phone (${res.user.phone || phone})`);
        return res.user;
      }
      throw new Error(res.error || 'Invalid verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to verify code';
      this.toast.error('Verification Failed', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Email OTP — Request Verification Code
   */
  async sendEmailOtp(email: string): Promise<OtpResponse> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<OtpResponse>(`${this.apiUrl}/api/auth/email/send-otp`, { email })
      );
      if (res && res.success) {
        this.toast.info('Verification Code Sent', res.message || 'Check your inbox for the 6-digit code.');
        return res;
      }
      throw new Error(res.error || 'Failed to send email verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to send email OTP';
      this.toast.error('Email Error', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Option 3: Email OTP — Verify Code & Sign In
   */
  async verifyEmailOtp(email: string, otp: string): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/email/verify-otp`, { email, otp })
      );
      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        this.toast.success('Verified', `Signed in successfully as ${res.user.email}`);
        return res.user;
      }
      throw new Error(res.error || 'Invalid verification code');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Failed to verify email code';
      this.toast.error('Verification Failed', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Administrator Authentication: Verified strictly by backend with admin credentials
   */
  async loginAsAdmin(email: string, password: string, notify = true): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/admin/login`, { email, password })
      );

      if (res && res.success && res.token && res.user) {
        this.saveSession(res.token, res.user);
        if (notify) {
          this.toast.success('Curator Clearance Granted', `Authenticated as Administrator: ${res.user.fullName}`);
        }
        return res.user;
      }
      throw new Error(res.error || 'Administrator authentication rejected');
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Invalid administrator credentials';
      this.toast.error('401 Unauthorized', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Staff Authentication: Authenticates venue/door staff for operational access
   */
  async loginAsStaff(email: string, password: string, notify = true): Promise<User> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/staff/login`, { email, password })
      );

      if (!res || !res.success || !res.token || !res.user || res.user.role !== 'STAFF') {
        throw new Error(res?.error || 'Staff authentication rejected');
      }

      this.saveSession(res.token, res.user);
      if (notify) {
        this.toast.success('Staff Clearance Granted', `Authenticated as Staff: ${res.user.fullName || res.user.name}`);
      }
      return res.user;
    } catch (err: any) {
      const msg = err.error?.error || err.message || 'Staff authentication rejected';
      this.toast.error('401 Unauthorized', msg);
      throw new Error(msg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Secure Sign Out: Clears tokens, local state, and invalidates session
   */
  logout(notify = true): void {
    // Attempt backend logout notice
    try {
      const token = this.token();
      if (token) {
        firstValueFrom(
          this.http.post(`${this.apiUrl}/api/auth/logout`, {}, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
          })
        ).catch(() => {});
      }
    } catch {
      // Ignore background logout network errors
    }

    const wasAdmin = this.isAdmin();
    this.clearSession();

    if (notify) {
      this.toast.info('Signed Out', 'Your session has been terminated securely.');
    }

    // If logging out from an admin or staff view, redirect immediately to login
    if (wasAdmin || this.router.url.startsWith('/admin') || this.router.url.startsWith('/staff') || this.router.url.startsWith('/check-in')) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private saveSession(token: string, user: User): void {
    this.token.set(token);
    this.currentUser.set(user);
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  private clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    localStorage.removeItem(this.USER_STORAGE_KEY);
  }

  getAuthHeaders(): HttpHeaders {
    const t = this.token();
    if (t) {
      return new HttpHeaders({
        Authorization: `Bearer ${t}`
      });
    }
    return new HttpHeaders();
  }
}

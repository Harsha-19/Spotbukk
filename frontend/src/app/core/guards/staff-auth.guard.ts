import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const staffAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  // 1. Unauthenticated users -> Redirect to Login Page with mode=staff
  if (!authService.isAuthenticated()) {
    toast.error('Authentication Required', 'Please sign in with a Staff account to access the staff portal.');
    router.navigate(['/login'], {
      queryParams: { reason: 'unauthenticated', returnUrl: state.url, mode: 'staff' }
    });
    return false;
  }

  // 2. Authenticated non-staff users (CUSTOMER/END_USER) -> Strictly 403 Forbidden
  if (!authService.canAccessStaff()) {
    toast.error('403 Forbidden', 'Access restricted. This section is strictly reserved for Staff and operational personnel.');
    router.navigate(['/unauthorized'], {
      queryParams: { reason: 'forbidden', returnUrl: state.url }
    });
    return false;
  }

  return true;
};

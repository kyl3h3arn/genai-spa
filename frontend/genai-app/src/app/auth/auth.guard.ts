import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  console.log('AuthGuard: token =', token); // 👈 Add this

  if (token) {
    return true;
  } else {
    console.warn('AuthGuard: no token, redirecting to /login');
    router.navigate(['/login']);
    return false;
  }
};

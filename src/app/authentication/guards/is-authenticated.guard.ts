import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationStatus } from '../interfaces/authentication-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  
  if (authenticationService.authStatus() === AuthenticationStatus.authenticated) {
    return true;
  }

  router.navigateByUrl('/auth/login');

  return false;
};

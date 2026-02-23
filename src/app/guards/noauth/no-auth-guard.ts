import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { filter, map, take } from 'rxjs/operators';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

 return authService.isAuthenticated.pipe(
  filter(val => val !== null),
  take(1),
  map(isAuth => {
    if (isAuth) {
      return router.createUrlTree(['/tabs']);
    } else {
      return true;
    }
  })
);
};
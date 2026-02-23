import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // On s'abonne à l'état d'authentification défini dans le service
  return authService.isAuthenticated.pipe(
     // On prend la valeur actuelle
    filter(val => val !== null),
    take(1),
    map(isAuth => {
      if (isAuth) {
        return true; // Accès autorisé
      } else {
        // Redirection vers login si non connecté
        return router.createUrlTree(['/login']);
      }
    })
  );
};
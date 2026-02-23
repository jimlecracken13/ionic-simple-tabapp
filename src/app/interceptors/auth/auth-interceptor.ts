import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Liste des routes publiques à ignorer
  // On vérifie si l'URL contient l'un de ces segments
  const isPublicRoute = req.url.includes('/login') || req.url.includes('/register');

  // 2. Si c'est une route publique, on laisse passer la requête SANS modification
  if (isPublicRoute) {
    return next(req);
  }

  // On récupère le token de façon asynchrone
  return from(authService.getToken()).pipe(
    switchMap(token => {
      let authReq = req;

      // Si le token existe, on clone la requête pour ajouter le header
      if (token) {
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // On passe la requête et on gère les erreurs 401
      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            authService.logout();
            router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    })
  );
};
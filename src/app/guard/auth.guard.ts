import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.refreshToken().pipe(
    map(() => {
     
      router.navigateByUrl('/');  
      return false; 
    }),
    catchError(() => {
     
      return of(true); 
    })
  );
};
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, concatMap, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.refreshToken().pipe(
    concatMap(() => 
      authService.getMe().pipe(
        map((user) => {
          if (user[0].role==="ADMIN") {            
            return true;
          } else {            
            router.navigateByUrl("/")
            return false;
          }
        }),
        catchError(() => {
          router.navigateByUrl("/")
          return of(false); 
        })
      )
    ),
    catchError(() => {
     
      router.navigateByUrl("/");
      return of(false);
    })
  );

};

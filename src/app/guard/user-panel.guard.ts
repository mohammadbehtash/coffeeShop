import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError, concatMap, map, Observable, of, switchMap } from 'rxjs';


export const userPanelGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // return authService.refreshToken().pipe(
  //   switchMap(() => 
  //     authService.getMe().pipe(
  //       map((user) => {
  //         if (user) {
           
  //           return true;
  //         } else {
           
  //           router.navigate(['/auth']);
  //           return false;
  //         }
  //       }),
  //       catchError(() => {
       
  //         router.navigate(['/auth']);
  //         return [false];
  //       })
  //     )
  //   )
  // );
  //============
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.gettoken().pipe(
    switchMap((accessToken: string) => {
      if (accessToken) {
        // اگر توکن موجود است، توکن را رفرش کنید و سپس ادامه دهید
        return authService.refreshToken().pipe(
          concatMap(() =>
            authService.getMe().pipe(
              map((user) => {
                // بررسی نقش کاربر
                if (user && (user[0].role === "USER" || user[0].role === "ADMIN")) {
                  return true;
                } else {
                  router.navigateByUrl("/auth");
                  return false;
                }
              }),
              catchError(() => {
                // در صورت بروز خطا کاربر را به صفحه اصلی هدایت کنید
                router.navigateByUrl("/auth");
                return of(false);
              })
            )
          )
        );
      } else {
        // اگر توکن موجود نبود، به صفحه لاگین هدایت شود
        router.navigateByUrl("/auth");
        return of(false);
      }
    }),
    catchError(() => {
     
      router.navigateByUrl("/auth");
      return of(false);
    })
  );

//==========



};


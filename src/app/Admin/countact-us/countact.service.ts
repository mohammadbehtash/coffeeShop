import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CountactUs } from '../../Models/contact-us.model';

@Injectable({
  providedIn: 'root'
})
export class CountactService {
  private BaseUrl = 'http://localhost:4000/'
  http = inject(HttpClient)
  private CountentUsSource = new BehaviorSubject<number>(0)
  CountentUs$ = this.CountentUsSource.asObservable()
  constructor(private authService: AuthService) { }

  updateCountentUs(cunt: number) {
    this.CountentUsSource.next(cunt)
  }

  GetShowAllCountact_us(): Observable<CountactUs[]> {
    return this.authService.gettoken().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<CountactUs[]>(this.BaseUrl + 'contact-us/', { headers })
      })
    )
  }

  postAnswer(answer: CountactUs): Observable<CountactUs> {
    return this.authService.gettoken().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post<CountactUs>(this.BaseUrl + 'contact-us/answer', answer, { headers })
      })
    )
  }

}

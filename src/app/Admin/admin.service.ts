import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Admin_model } from '../Models/adminInfo.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor(private authService:AuthService){ }
  
private modalSubject=new Subject<{message:string,itemName:string,confirm:()=>void}>()
modalObserVeble$=this.modalSubject.asObservable()

  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  setTitle(newTitle: string): void {
    this.titleSubject.next(newTitle);
  }

  getTitle(): string {
    return this.titleSubject.getValue();
  }

  openModal(message:string,itemName:string,confirmCallback:()=>void){
    this.modalSubject.next({message,itemName,confirm:confirmCallback})
  }

  ShowAdminInfo():Observable<Admin_model>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
          return this.http.get<Admin_model>(this.BaseUrl+'info/p-admin',{headers})
      })
    )
  }

}

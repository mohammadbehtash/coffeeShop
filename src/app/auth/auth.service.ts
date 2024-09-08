import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CsrfService } from '../csrf/csrf.service';
import { BehaviorSubject, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import {CookieService}from 'ngx-cookie-service';
import { Creator } from '../Models/creator.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //     .set('X-CSRF-TOKEN', csrfToken || '')
  //     .set('Content-Type', 'application/json');
  // }
 
  // openModal(arg0: string, name: void, arg2: () => void) {
  //   throw new Error('Method not implemented.');
  // }
  private BaseUrl = 'http://localhost:4000/auth'
  headers!: HttpHeaders;
  private isLoggedinSubject=new BehaviorSubject<boolean>(false)
  isLoggedis$=this.isLoggedinSubject.asObservable()
  constructor( private csrfService: CsrfService,private cookieService: CookieService) {
  }
  http=inject(HttpClient)
  // send Code
  // async postData(data: any) {
  //   const csrfToken = await this.csrfService.getCsrfToken();

  //   this.headers = new HttpHeaders()
  //     .set('X-CSRF-TOKEN', csrfToken || '')
  //     .set('Content-Type', 'application/json');
  // }


   sendEmail(email: string) {
    //  this.postData(null); 
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(this.BaseUrl + '/send-verification-code', { email }, {
      // headers: { "Content-Type": "application/json" }
      headers,withCredentials: true
    });
  }


  verifiEmail(verificationCode:string){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(this.BaseUrl + '/verify-code-and-register', { verificationCode }, {headers,withCredentials: true});
  }


  register(register:any){
    this.isLoggedinSubject.next(true)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(this.BaseUrl+'/register',register,{headers,withCredentials:true})
  }


  loginuser(loginForm:any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.isLoggedinSubject.next(true)
    return this.http.post<any>(this.BaseUrl+'/login',loginForm,{
      headers,withCredentials: true
    })
  }

  logoutUser(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.BaseUrl+'/logout',null,{
      headers,withCredentials: true
    }).pipe(tap(()=>{
      this.isLoggedinSubject.next(false)
    }))
  }

  
 
  getCookie():Observable<any>{  
    return this.http.get<any>(this.BaseUrl+'/access-token',{ withCredentials: true})
    }
    
    refreshToken(): Observable<{ accessToken: string }> {
      // const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post<{ accessToken: string }>(`${this.BaseUrl}/refresh-token`,null,{
        withCredentials: true
      }).pipe(map((res:any)=>{
        // console.log('refreshToken=>',res);
        return res
      }))
    }
    
    gettoken():Observable<any>{
      return this.getCookie().pipe(
        map((res: any) => {
          return res || '';
        })
      );
    }
    
    getMe(): Observable<Creator[]> {
      
      return this.gettoken().pipe(
        switchMap((accessToken: string) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
          // console.log(headers);
          return this.http.get<Creator[]>(this.BaseUrl + '/me', { headers });
        })
      );
    }
     
    
      showUserNameInNav(){
        const data=this.getMe()
        return data
      }
    
    }
    
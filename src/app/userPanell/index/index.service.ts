import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
 private openNavSubject = new Subject<boolean>();
 openNav$ = this.openNavSubject.asObservable();
  constructor() { }
  
  setOpenNav(status:boolean){
    this.openNavSubject.next(status)
  }


}

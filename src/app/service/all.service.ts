import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  isDarkMode: boolean = false;

  constructor() { }
 
  private openNavSubject = new BehaviorSubject<boolean>(false);
  private openCartSubject = new BehaviorSubject<boolean>(false);
  openNav$ = this.openNavSubject.asObservable();
  openCart$ = this.openCartSubject.asObservable();

  setOpenNav(status: boolean) {
    this.openNavSubject.next(status);
  }

  setOpenCart(status: boolean) {
    this.openCartSubject.next(status);
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  toggleDarkMode() {
    if (typeof document !== 'undefined'){
      if (this.isLocalStorageAvailable() && localStorage.getItem('dark')) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    }
    
  }

  checkDarkMode() {
    this.toggleDarkMode();
  }

  setDarkMode(isDark: boolean) {
    if (this.isLocalStorageAvailable()) {
      if (isDark) {
        localStorage.setItem('dark', 'true');
      } else {
        localStorage.removeItem('dark');
      }
      this.toggleDarkMode();
    } else {
      console.warn('localStorage is not available.');
    }
  }
  }


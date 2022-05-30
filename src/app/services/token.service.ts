import { EventEmitter,Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isLoggedInChange = new EventEmitter<boolean>();

  private _isLoggedInSub = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedInSub.asObservable();

  constructor(private cookieService: CookieService, private router: Router) {
    if (this.isLoggedIn()) {
      this.setLoggedIn(true);
    }
   }

  setToken(token: string) {
    this.cookieService.set('AuthToken', token);
  }
  getToken() {
    return this.cookieService.get('AuthToken');
  }
  removeToken() {
    this.cookieService.delete('AuthToken');
    this.cookieService.deleteAll();
    localStorage.clear();
    this.removeTC();
    this.router.navigate(["/"]);
  }

  setIpAddrress(IpAddrress: string) {
    this.cookieService.set('clientIp', IpAddrress);
  }
  getIpAddrress() {
    return this.cookieService.get('clientIp');
  }

  setType(userType: string) {
    this.cookieService.set('type', userType);
  }
  getType() {
    return +this.cookieService.get('type');
  }
  removeType() {
    this.cookieService.delete('type');
  }

  setTC(data: string) {
    this.cookieService.set('tc', data);
  }
  getTC() {
    return this.cookieService.get('tc');
  }
  removeTC() {
    this.cookieService.delete('tc');
  }

  isLoggedIn() {
    let authToken = this.cookieService.get('AuthToken');
    return this.cookieService.get('AuthToken') && authToken !== '';
  }
  setLoggedIn(isLoggedIn: boolean) {
    if (this._isLoggedInSub.getValue() !== isLoggedIn) {
      this._isLoggedInSub.next(isLoggedIn);
    }
  }

  loggedOut() {
    this.isLoggedInChange.emit(false);
    this.cookieService.deleteAll();
    localStorage.clear();
    this.removeTC();
  }
}

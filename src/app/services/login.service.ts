import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  changePwd(value: any) {
    throw new Error('Method not implemented.');
  }
  getUserProfile: any;
  getUserProflie() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient,private cookie: CookieService) { }

  Login(data: any): Observable<any> {
    return this.http.post(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Login`, data)
  }

  ChangePwd(data:any): Observable<any> {
    return this.http.post(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/ChangePwd`, data)
  }

  Logout(data:any): Observable<any> {
    return this.http.post(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Logout`, data)
  }
  GetIpAddrress():Observable<any>{
    return this.http.get(`https://api.ipify.org?format=json`);
  }

}

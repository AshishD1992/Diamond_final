import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 

  constructor(private http: HttpClient,private cookie: CookieService) { }

  Login(data: any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Login`, data)
  }

  ChangePwd(data:any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsClient/SportsClient.svc/ChangePwd`, data)
  }

  Logout(data:any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Logout`, data)
  }
  GetIpAddrress():Observable<any>{
    return this.http.get(`https://api.ipify.org?format=json`);
  }

}

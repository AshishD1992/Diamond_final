import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(data: any): Observable<any> {
    return this.http.post(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Login`, data)
  }

  GetIpAddrress():Observable<any>{
    return this.http.get(`https://api.ipify.org?format=json`);
  }

}

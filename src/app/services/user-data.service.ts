import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  constructor(private http:HttpClient) { }

  FundExpo():Observable<any>{
    return this.http.get(`http://www.t20exchanges247.com/SportsRead2/SportsClient.svc/Data/FundExpo2`)
  }
  GetUserData():Observable<any>{
    return this.http.get(`http://www.t20exchanges247.com/SportsRead1/SportsClient.svc/Data/GetUserData`)
  }
  HubAddress(ID:any):Observable<any>{
    return this.http.get(`http://www.t20exchanges247.com/SportsRead5/SportsClient.svc/Data/HubAddress?id=${ID}`)
  }
  MktData(MTID:any,MKTID:any):Observable<any>{
    return this.http.get(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Data/MktData?mtid=${MTID}&mktid=${MKTID}`)
  }
  UserDescription():Observable<any>{
    return this.http.get(`http://www.t20exchanges247.com/SportsRead3/SportsClient.svc/Data/UserDescription2`)
  }

}

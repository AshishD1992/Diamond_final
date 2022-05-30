import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private http: HttpClient) { }

  AccountStatement(FROM: any, TO: any, FILTER: any): Observable<any> {
    return this.http.get(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Reports/AccountStatement?from=${FROM}&to=${TO}&filter=${FILTER}`);
  }
  GetBetHistory(FROM:any, TO:any, BETSTATUS:any): Observable<any> {
    return this.http.get(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Reports/GetBetHistory?from=${FROM}&to=${TO}&betstatus=${BETSTATUS}`);
  }
  GetProfitLoss(FROM:any, TO:any): Observable<any> {
    return this.http.get(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Reports/GetProfitLoss?from=${FROM}&to=${TO}`);
  }
  GetProfitLossfromAS(MTID:any, MKTID:any, TYPE:any): Observable<any> {
    return this.http.get(`http://www.t20exchanges247.com/SportsClient/SportsClient.svc/Reports/GetProfitLossfromAS?mtid=${MTID}&mktid=${MKTID}&type=${TYPE}`);
  }
}

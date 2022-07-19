import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private http: HttpClient) { }

  AccountStatement(FROM:any, TO: any, FILTER: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/AccountStatement?from=${FROM}&to=${TO}&filter=${FILTER}`);
  }
  GetBetHistory(FROM: any, TO: any, BETSTATUS: any, STYPE: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/GetBetHistory?from=${FROM}&to=${TO}&betstatus=${BETSTATUS}&stype=${STYPE}`);
  }
  GetProfitLoss(FROM: any, TO: any, STYPE: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/GetProfitLoss?from=${FROM}&to=${TO}&stype=${STYPE}`);
  }
  GetProfitLossfromAS(MTID: any, MKTID: any, TYPE: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/GetProfitLossfromAS?mtid=${MTID}&mktid=${MKTID}&type=${TYPE}`);
  }
  GetTpProfitLossfromAS(ROUNDID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/GetTpProfitLossfromAS?roundid=${ROUNDID}`);
  }
  isAlive(): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/isAlive`);
  }

  GetRecentGameResult(gametype: any): Observable<any> {
    return this.http.get<any>(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/GetRecentGameResult?gametype=${gametype}`);
  }
  GetCaisnoResults(from: any, to: any, type: any): Observable<any> {
    return this.http.get<any>(`http://www.cricbet247.live/SportsClient/SportsClient.svc/Reports/GetCaisnoResults?from=${from}&to=${to}&gtype=${type}`);
  }
}

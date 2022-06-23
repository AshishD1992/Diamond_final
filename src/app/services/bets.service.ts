import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BetsService {

  constructor(private http: HttpClient) { }

  PlaceMOBet(data: any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/PlaceMOBet`, data)
  }
  PlaceFancyBet(data: any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/PlaceFancyBet`, data)
  }
  PlaceBookBet(data: any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/PlaceBookBet`, data)
  }

  PlaceTpBet(data: any): Observable<any> {
    return this.http.post(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/PlaceTpBet`, data)
  }

  ExposureBook(MKTID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsRead4/SportsClient.svc/Bets/ExposureBook?mktid=${MKTID}`)
  }
  GetFancyExposure(MTID: any, FID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsRead4/SportsClient.svc/Bets/GetFancyExposure?mtid=${MTID}&fid=${FID}`)
  }
  BMExposureBook(MKTID: any, BID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsRead4/SportsClient.svc/Bets/BMExposureBook?mktid=${MKTID}&bid=${BID}`)
  }
  Fancybook(MTID: any, FID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsRead4/SportsClient.svc/Bets/Fancybook?mtid=${MTID}&fid=${FID}`)
  }

  T20ExposureBook(GAMEID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/T20ExposureBook?gameid=${GAMEID}`)
  }
  Lucky7ExposureBook(GAMEID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/Lucky7ExposureBook?gameid=${GAMEID}`)
  }
  ThreeCardJExposureBook(GAMEID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/ThreeCardJExposureBook?gameid=${GAMEID}`)
  }
  AndarBaharExposureBook(GAMEID: any): Observable<any> {
    return this.http.get(`http://www.cricbet247.live/SportsBet/SportsClient.svc/Bets/AndarBaharExposureBook?gameid=${GAMEID}`)
  }
}

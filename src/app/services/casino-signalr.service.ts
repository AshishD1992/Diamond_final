import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import * as _ from 'lodash';
import { hubConnection } from 'signalr-no-jquery';

@Injectable({
  providedIn: 'root'
})
export class CasinoSignalrService {
    private casinoConnection: any;
    private casinoProxy: any;
    private casinoHubConn: any;
  
    private casinoHubAddress: any;
  
    casinoSource!: Observable<any>;
    private currentCasino!: BehaviorSubject<any>;
    constructor() {
        this.currentCasino = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.casinoSource = this.currentCasino.asObservable();
    }

    connectCasino(casinoHubAddress: any, gameType: any) {
        this.casinoHubAddress = casinoHubAddress;
    
        // if(this.casinoHubConn==null){
        this.casinoConnection = hubConnection(this.casinoHubAddress);
        this.casinoProxy = this.casinoConnection.createHubProxy("FancyHub");
    
        this.casinoConnection.start().done((casinoHubConns: { state: string; }) => {
          this.casinoHubConn = casinoHubConns;
          console.log("Casino Hub Connection Established = " + casinoHubConns.state);
    
          this.casinoProxy.invoke('SubscribeFancy', gameType);
    
        }).fail((casinoHubErr:any) => {
          console.log("Could not connect Casino Hub = " + casinoHubErr.state)
        })
        // }
    
    
        this.casinoProxy.on("BroadcastSubscribedData", (data: any) => {
          // console.log(data);
          this.currentCasino.next(data);
        })
      }

      UnsuscribeCasino(gameType: any) {
        if (!this.casinoHubConn) {
          return;
        }
        if (this.casinoHubConn.state == 1) {
          this.casinoProxy.invoke('UnsubscribeFancy', gameType);
          this.casinoConnection.stop();
          this.casinoHubConn = null;
          this.casinoConnection = null;
          this.casinoProxy = null;
          this.currentCasino.next(null);
        }
      }

}
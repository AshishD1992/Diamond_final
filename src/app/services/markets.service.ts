import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { Observable, BehaviorSubject } from 'rxjs';
import { hubConnection } from 'signalr-no-jquery';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  private marketConnection:any;
  private marketProxy:any;
  private marketHubConn:any;

  private marketHubAddress:any;

  marketSource: Observable<any>;
  private currentMarket: BehaviorSubject<any>;

  marketErrSource: Observable<any>;
  private currentMarketErr: BehaviorSubject<any>;

  constructor() { 
    this.currentMarket=<BehaviorSubject<any>>new BehaviorSubject(null);
    this.marketSource=this.currentMarket.asObservable();

    this.currentMarketErr=<BehaviorSubject<any>>new BehaviorSubject(null);
    this.marketErrSource=this.currentMarketErr.asObservable();
  }

  connectMarket(marketHubAddress:any, markets:any) {
    this.marketHubAddress=marketHubAddress;

    this.marketConnection = hubConnection(this.marketHubAddress);
    this.marketProxy = this.marketConnection.createHubProxy("RunnersHub");

    this.marketConnection.start().done((marketHubConns:any) => {
      this.marketHubConn = marketHubConns;
      console.log("Market Hub Connection Established = " + marketHubConns.state);
      _.forEach(markets, (item:any) => {
        this.marketProxy.invoke('SubscribeMarket', item.bfId);
      });
    }).fail((marketHubErr:any) => {
      console.log("Could not connect Market Hub = " + marketHubErr.state)
    })


    this.marketProxy.on("BroadcastSubscribedData",(runner:any)=>{
      // console.log(runner);
      this.currentMarket.next(runner);
    })
  }


  UnsuscribeMarkets(markets:any) {
    if(!this.marketHubConn){
      return;
    }
    if (this.marketHubConn.state == 1) {
      _.forEach(markets, (item:any) => {
        this.marketProxy.invoke('UnsubscribeMarket', item.bfId);
      });
      this.marketConnection.stop();
      this.marketHubConn=null;
      this.marketConnection=null;
      this.marketProxy=null;
      this.currentMarket.next(null);
    }
  }

  UnsuscribeSingleMarket(bfId:any) {
    if(!this.marketHubConn){
      return;
    }
    if (this.marketHubConn.state == 1) {
        this.marketProxy.invoke('UnsubscribeMarket', bfId);
    }
  }
}

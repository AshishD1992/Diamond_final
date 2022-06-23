import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { Connection, hubConnection } from 'signalr-no-jquery';

@Injectable({
  providedIn: 'root'
})
export class FancyService {

  private fancyConnection:any;
  private fancyProxy:any;
  private fancyHubConn:any;

  private fancyHubAddress:any;

  fancySource: Observable<any>;
  private currentFancy: BehaviorSubject<any>;

  constructor() {
    this.currentFancy = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fancySource = this.currentFancy.asObservable();
  }

  connectFancy(fancyHubAddress:any, fancy:any) {
    this.fancyHubAddress = fancyHubAddress;

    // if(this.fancyHubConn==null){
      this.fancyConnection = hubConnection(this.fancyHubAddress);
      this.fancyProxy = this.fancyConnection.createHubProxy("FancyHub");

      this.fancyConnection.start().done((fancyHubConns:any) => {
        this.fancyHubConn = fancyHubConns;
        console.log("Fancy Hub Connection Established = " + fancyHubConns.state);
        _.forEach(fancy, (item:any) => {
          this.fancyProxy.invoke('SubscribeFancy', item.id);
        });
      }).fail((fancyHubErr:any) => {
        console.log("Could not connect Fancy Hub = " + fancyHubErr.state)
      })
    // }
    


    this.fancyProxy.on("BroadcastSubscribedData", (fancy:any) => {
      // console.log(fancy);
      this.currentFancy.next(fancy);
    })
  }

  UnsuscribeFancy(fancy:any) {
    if(!this.fancyHubConn){
      return;
    }
    if (this.fancyHubConn.state == 1) {
      _.forEach(fancy, (item:any) => {
        this.fancyProxy.invoke('UnsubscribeFancy', item.id);
      });
      this.fancyConnection.stop();
      this.fancyHubConn=null;
      this.fancyConnection=null;
      this.fancyProxy=null;
      this.currentFancy.next(null);
    }
  }

  UnsuscribeSingleFancy(matchId:any) {
    if(!this.fancyHubConn){
      return;
    }
    if (this.fancyHubConn.state == 1) {
        this.fancyProxy.invoke('UnsubscribeFancy', matchId);
    }
  }
}

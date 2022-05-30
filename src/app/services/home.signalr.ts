import { Injectable } from "@angular/core";
import { DataFormatService } from './data-format.service';
import { SharedataService } from './sharedata.service';


@Injectable({
    providedIn: 'root',
  })

  export class HomeSignalrServices{

    private readonly dataHubAddress: string = 'http://167.86.68.93:16501';
  private readonly proxyToken: string = '1937-789-123';

  homeConnection: any;
  homeProxy: any;
  constructor(
    private dataFormat: DataFormatService,
    private shareData: SharedataService
  ) {}

  connectHome() {
    this.homeConnection = (<any>$).hubConnection(this.dataHubAddress);

    this.homeProxy = this.homeConnection.createHubProxy('DataHub');

    this.homeConnection
      .start()
      .done((clientHubConn: any) => {
        console.log(`Connection Established to DataHub ${clientHubConn.state}`);
        this.homeProxy.invoke('SubscribeData', this.proxyToken);
      })
      .fail((err: any) => {
        console.error(`Connection failed ${err.state}`);
      });

    this.reconnect();
    this.subscribeToMessages();
  }

  subscribeToHomeSignalR() {
    this.homeProxy.invoke('SubscribeData', this.proxyToken);
  }

  reconnect() {
    this.homeConnection.stateChanged((change: any) => {
      if (change.state === 4 && this.homeConnection != null) {
        this.homeConnection
          .start()
          .done((clientHubConns: any) => {
            console.log(
              'Home Hub Reconnection Established = ' + clientHubConns.state
            );
            this.homeProxy.invoke('SubscribeData');
          })
          .fail((clientHubErr: any) => {
            console.log(
              'Could not Reconnect Home Hub = ' + clientHubErr.state
            );
          });
      }
    });
  }

  subscribeToMessages() {
    this.homeProxy.on('BroadcastSubscribedData', (data: any) => {
      // console.log(data);
      // this.dFService.shareNews(data.news);
      // this.dFService.shareDateTime(new Date(data.curTime.replace(/ /g, "T")));
      this.dataFormat.shareNavigationData(
        this.dataFormat.NavigationFormat(data.sportsData,data.curTime)
      );
      this.shareData.shareuserData(data);
      // this.shareData.shareFancyExposure(data._fancyBook);
      // var AllBetsData = {
      //   _userAvgmatchedBets: data._userAvgmatchedBets,
      //   _userMatchedBets: data._userMatchedBets,
      //   _userUnMatchedBets: data._userUnMatchedBets
      // };
      // this.shareData.shareAllMatchUnmatchBetsData(AllBetsData);
    });
  }

  unSubscribeDataHub() {
    if (this.homeConnection && this.homeProxy) {
      this.homeProxy.invoke('UnSubscribeData', this.proxyToken);
      this.homeConnection.stop();
      this.homeConnection = null;
      this.homeProxy = null;
    }
  }

  }
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { SharedataService } from '../services/sharedata.service';
import { UserDataService } from '../services/user-data.service';
import { DataFormatService } from '../services/data-format.service';
import { UserSignalrService } from '../services/user.signalr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sportsData:any
  sportList : any;
  constructor(
    private token:TokenService,    
    private shareData:SharedataService,
    private data:UserDataService,
    private dataFormat:DataFormatService,
    private userSignalR: UserSignalrService,
  ) { }

  ngOnInit(): void {
    this.token.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        
        this.data.UserDescription().subscribe((data: any) => {
          let userdata = data.data;
          this.shareData.shareuserdescriptiondata(data.data);
          this.userSignalR.connectClient(userdata.add);

        });
        this.data.GetUserData().subscribe((resp: any) => {

          let response = resp;
          this.sportsData=response.sportsData;
          this.shareData.shareuserData(response);
          this.dataFormat.shareNavigationData(
            this.dataFormat.NavigationFormat(response.sportsData,response.curTime)
          );
        });
      } else {

        // this.subSink.unsubscribe();
        // TODO: unsubscribe SignalR
        this.userSignalR.unSubscribe();        
        this.dataFormat.navigation$.subscribe(sportdata=>{
          this.sportsData=sportdata;
        })
      }
    });
  }

}

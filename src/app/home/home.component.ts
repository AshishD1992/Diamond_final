import { Component, OnInit ,NgModule} from '@angular/core';
import {HomeSignalrServices} from '../services/home.signalr'

import * as $ from 'jquery';
import { TokenService } from '../services/token.service';
import { SharedataService } from '../services/sharedata.service';
import { UserDataService } from '../services/user-data.service';
import { DataFormatService } from '../services/data-format.service';
import { UserSignalrService } from '../services/user.signalr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sportsData:any
  sportList : any;

  sportSubscription!: Subscription;
  constructor(
    private token:TokenService,
    private homeSignalR:HomeSignalrServices,
    private shareData:SharedataService,
    private data:UserDataService,
    private dataFormat:DataFormatService,
    private userSignalR: UserSignalrService,
  ) { }

  ngOnInit(): void {
    // Just Study
    $(document).on('click', '.tab-list li a', function() {
      var $this = $(this),
          $tabList = $this.parents('ul'),
          _idx = $this.closest('li').index();
      
      $tabList.children().eq(_idx).addClass('in').siblings().removeClass('in');
      $tabList.next().children().eq(_idx).addClass('in').siblings().removeClass('in');
    });

    this.token.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.homeSignalR.unSubscribeDataHub();
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
        this.homeSignalR.connectHome();
        this.dataFormat.navigation$.subscribe(sportdata=>{
          this.sportsData=sportdata;
        })
      }
    });

    this.sportWise();
    localStorage.removeItem("favourite");
  }

  sportWise() {
    this.sportSubscription = this.dataFormat.navigation$.subscribe(data => {
      if (data != null) {
        this.sportList = this.dataFormat.sportEventWise(data,0);
        console.log(this.sportList)
      }
    });
  }

  trackBySport(index:any,item:any) {
    return item.bfId;
  }

}


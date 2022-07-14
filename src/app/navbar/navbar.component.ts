import { Component, OnInit,NgModule } from '@angular/core';
import * as $ from 'jquery';

import { DataFormatService } from '../services/data-format.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sportsData:any
  sportList : any;

  sportSubscription!: Subscription;

  constructor(
    private dataFormat:DataFormatService,
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
  trackByEvent(index:any, item:any) {
    return item.matchId;
  }
  toggleFavourite(event:any) {
    this.dataFormat.ToggleFavourite(event.mtBfId, false);
  }

}

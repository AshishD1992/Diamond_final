import { Component, OnInit,NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';

import { DataFormatService } from '../services/data-format.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sportsData:any
  sportList : any;

  sportSubscription!: Subscription;

  constructor(
    private dataFormat:DataFormatService,
  ) { }

  ngOnInit(): void {

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
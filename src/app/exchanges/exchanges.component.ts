import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataFormatService } from '../services/data-format.service';
@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class  ExchangesComponent implements OnInit {

  sportList = [];

  sportSubscription!: Subscription;
  constructor(private dfService: DataFormatService,) { }

  ngOnInit(): void {
    this.sportWise();
  }
  sportWise() {
    this.sportSubscription = this.dfService.navigation$.subscribe((data: null) => {
      if (data != null) {
        this.sportList = this.dfService.sportEventWise(data, 0).reverse();

        // console.log(this.sportList)
      }
    });
  }
  toggleFavourite(event:any) {
    this.dfService.ToggleFavourite(event.mtBfId, false);
  }
  trackBySport(index:any, item:any) {
    return item.bfId;
  }

  trackByEvent(index:any, item:any) {
    return item.matchId;
  }

}

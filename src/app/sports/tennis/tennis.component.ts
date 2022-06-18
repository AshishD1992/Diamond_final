import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataFormatService } from 'src/app/services/data-format.service';

@Component({
  selector: 'app-tennis',
  templateUrl: './tennis.component.html',
  styleUrls: ['./tennis.component.scss']
})
export class TennisComponent implements OnInit {
  sportList: any;
  sportSubscription: Subscription = new Subscription;
  constructor(private dfService: DataFormatService) { }


  ngOnInit(): void {
    this.sportWise();
    localStorage.removeItem("favourite");
  }

  sportWise() {
    this.sportSubscription = this.dfService.navigation$.subscribe(data => {
      // console.log(data)
      if (data != null) {
        this.sportList = this.dfService.sportEventWise(data,0)
        console.log(this.sportList)
      }
    });
  }

  toggleFavourite(event:any) {
    this.dfService.ToggleFavourite(event.mtBfId, false);
  }

  trackBySport(index:any,item:any) {
    return item.bfId;
  }

  trackByEvent(index:any,item:any) {
    return item.matchId;
  }

}

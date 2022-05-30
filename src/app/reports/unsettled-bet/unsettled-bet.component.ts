import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReportService } from 'src/app/report.service';
@Component({
  selector: 'app-unsettled-bet',
  templateUrl: './unsettled-bet.component.html',
  styleUrls: ['./unsettled-bet.component.scss']
})
export class UnsettledBetComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true }) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  selectfromdate!: Date;
  selecttodate!: Date;
  selecttotime!: Date;
  selectfromtime!: Date;

  total:any
  
  loader: boolean = false;
  UnsettledBet: any;
  UnsettledData!: never[];
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.initDatatable();
    // this.selectfromdate = new Date(new Date().setDate(new Date().getDate() - 1));
    // this.selecttodate = new Date();
    this.selectfromdate = new Date(new Date().setHours(0,0,0));
    this.selecttodate = new Date(new Date().setHours(23, 59, 59));

    this.selectfromtime = new Date(new Date().setHours(0, 0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0, 0));

   

    this. UnsettledBet();
  }
  initDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
  }
  unsettled() {
    // let FROM="2020-6-10 00:00:00";
    // let TO="2020-7-11 23:59:00";
    // let FILTER = "1";

    this.UnsettledData = [];
    this.rerender();

    this.loader = true;

    let pnldates = {
      "fromdate": this.getFromDateAndTime(),
      "todate": this.getToDateAndTime()
    }

    localStorage.setItem("ReportDates", JSON.stringify(pnldates));
    this.reportService.GetProfitLoss(pnldates.fromdate, pnldates.todate).subscribe( resp => {
      this.UnsettledBet = resp.data;
      this.total=resp.total;
      console.log(this.UnsettledBet)
      this.rerender();
      this.loader = false;

    },
    err => {
      if (err.status == 401) {

      }
    }
  );
}

  getFromDateAndTime() {
   
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromdate.getHours()}:${this.selectfromdate.getMinutes()}:${this.selectfromdate.getSeconds()}`;

  }
  getToDateAndTime() {
    
    return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttodate.getHours()}:${this.selecttodate.getMinutes()}:${this.selecttodate.getSeconds()}`;
  }

  ngAfterViewInit() {
    this.dtTrigger;
  }

  rerender() {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger;
        // dtInstance.column('7').visible(false);
      });
    }
  }

}

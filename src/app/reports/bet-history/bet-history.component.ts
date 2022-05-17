import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ReportService } from 'src/app/report.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit,AfterViewInit {

  BETSTATUS = "OPEN";
  stype = 0;
  bets = []


  selectfromdate!: Date;
  selecttodate!: Date;
  selecttotime!: Date;
  selectfromtime!: Date;

  @ViewChild(DataTableDirective, { static: true }) dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  loader: boolean = false;

  constructor(private reportService: ReportService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.selectfromdate = new Date(new Date().setDate(new Date().getDate() - 1));
    // this.selecttodate = new Date();
    this.selectfromdate = new Date(new Date().setHours(0,0,0));
    this.selecttodate = new Date(new Date().setHours(23, 59, 59));

    this.selectfromtime = new Date(new Date().setHours(0, 0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0, 0));

    this.GetBetHistory();
  }

  selectTab(stype: number) {
    this.stype = stype;
    this.GetBetHistory();
  }

  GetBetHistory() {

    this.bets = [];
    this.rerender();

    this.loader = true;
    // let FROM = "2020-6-10 00:00:00";
    // let TO = "2020-7-11 23:59:00";
    let STYPE = this.stype;

    let pnldates = {
      "fromdate": this.getFromDateAndTime(),
      "todate": this.getToDateAndTime()
    }
    this.reportService.GetBetHistory(pnldates.fromdate, pnldates.todate, this.BETSTATUS, STYPE).subscribe(
      resp => {

        this.bets = resp.data;
        this.rerender();
        this.loader = false;

      },
      err => {
        if (err.status == 401) {
          //this.toastr.error("Error Occured");
        }
      }
    );
  }

  getFromDateAndTime() {
    // return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromtime.getHours()}:${this.selectfromtime.getMinutes()}:${this.selectfromtime.getSeconds()}`;
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromdate.getHours()}:${this.selectfromdate.getMinutes()}:${this.selectfromdate.getSeconds()}`;

  }
  getToDateAndTime() {
    // return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttotime.getHours()}:${this.selecttotime.getMinutes()}:${this.selecttotime.getSeconds()}`;
    return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttodate.getHours()}:${this.selecttodate.getMinutes()}:${this.selecttodate.getSeconds()}`;
  }

  getBetType(bet: { type: string; betType: string; }){
    let betType="";
    if(bet.type=="Lagai(B)"){
      betType='back';
      bet.betType='back';

    }else{
      betType='lay';
      bet.betType='lay';
    }
    return betType;
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

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

  @ViewChild(DataTableDirective, { static: true }) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  selectfromdate!: Date;
  selecttodate!: Date;
  selecttotime!: Date;
  selectfromtime!: Date;

  betstatus="4"
  historyData:any;
  loader: boolean = false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.initDatatable();

    this.selectfromdate = new Date(new Date().setHours(10,10,10));
    this.selecttodate = new Date(new Date().setHours(23, 59, 59));

    this.selectfromtime = new Date(new Date().setHours(0, 0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0, 0));

    this.GetBetHistory()
  }
  GetBetHistory() {

    this.historyData = [];
    this.rerender();

    this.loader = true;

    let pnldates = {
      "fromdate": this.getFromDateAndTime(),
      "todate": this.getToDateAndTime()
    }

    this.reportService.GetBetHistory(pnldates.fromdate, pnldates.todate,this.betstatus).subscribe( resp => {
        this.historyData = resp.data;

        this.rerender();
        this.loader = false;

      },
      err => {
        if (err.status == 401) {

        }
      }
    );
  }
  initDatatable() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      searching:false
    };
  }
  getFromDateAndTime() {
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() +1}-${this.selectfromdate.getDate()} ${this.selectfromdate.getHours()}:${this.selectfromdate.getMinutes()}:${this.selectfromdate.getSeconds()}`;

  }
  getToDateAndTime() {
    return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttodate.getHours()}:${this.selecttodate.getMinutes()}:${this.selecttodate.getSeconds()}`;
  }


  ngAfterViewInit() {
    this.dtTrigger.next(0);
  }


  rerender() {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(0);
        // dtInstance.column('7').visible(false);
      });
    }
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReportService } from 'src/app/report.service';
@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: true }) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  selectfromdate!: Date;
  selecttodate!: Date;
  selecttotime!: Date;
  selectfromtime!: Date;

  total:any
  profitData:any;
  loader: boolean = false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.initDatatable();

    this.selectfromdate = new Date(new Date().setHours(10,10,10));
    this.selecttodate = new Date(new Date().setHours(23, 59, 59));

    this.selectfromtime = new Date(new Date().setHours(0, 0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0, 0));

    this.GetProfitLoss()
  }
  GetProfitLoss() {

    this.profitData = [];
    this.rerender();

    this.loader = true;

    let pnldates = {
      "fromdate": this.getFromDateAndTime(),
      "todate": this.getToDateAndTime()
    }


    this.reportService.GetProfitLoss(pnldates.fromdate, pnldates.todate).subscribe( resp => {
        this.profitData = resp.data;
        this.total=resp.total;
        console.log(this.profitData)
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
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromdate.getHours()}:${this.selectfromdate.getMinutes()}:${this.selectfromdate.getSeconds()}`;

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

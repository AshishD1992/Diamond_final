import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy,Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/report.service';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
// import _ from 'lodash';
import * as _ from 'lodash';  


@Component({
  selector: 'app-aaccount-statement',
  templateUrl: './aaccount-statement.component.html',
  styleUrls: ['./aaccount-statement.component.scss']
})

export class AaccountStatementComponent implements OnInit,AfterViewInit {

  selectfromdate!: Date;
  selecttodate!: Date;
  selecttotime!: Date;
  selectfromtime!: Date;

  filter = "1";
  statementsData = [];

  @ViewChild(DataTableDirective, { static: true }) dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  loader: boolean = false;
  constructor(private reportService: ReportService,private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initDatatable();
    // this.selectfromdate = new Date(new Date().setDate(new Date().getDate() - 1));
    // this.selecttodate = new Date();
    this.selectfromdate = new Date(new Date().setHours(0,0,0));
    this.selecttodate = new Date(new Date().setHours(23, 59, 59));

    this.selectfromtime = new Date(new Date().setHours(0, 0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0, 0));

    // this.selectfromdate = null;
    // this.selecttodate = null;

    // let ReportDates;
    // if (localStorage.getItem("ReportDates")) {
    //   ReportDates = JSON.parse(localStorage.getItem("ReportDates"));
    //   this.selectfromdate = new Date(ReportDates.fromdate);
    //   this.selecttodate = new Date(ReportDates.todate);
    // }

    this.AccountStatement();
  }

  initDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
  }


  AccountStatement() {
    // let FROM="2020-6-10 00:00:00";
    // let TO="2020-7-11 23:59:00";
    // let FILTER = "1";

    this.statementsData = [];
    this.rerender();

    this.loader = true;

    let pnldates = {
      "fromdate": this.getFromDateAndTime(),
      "todate": this.getToDateAndTime()
    }

    localStorage.setItem("ReportDates", JSON.stringify(pnldates));

    this.reportService.AccountStatement(pnldates.fromdate, pnldates.todate, this.filter).subscribe(
      resp => {
        this.statementsData = resp.data.reverse();
        // _.forEach(this.statementsData, element => {
        //   if (element.cr == '-') {
        //     element.cr = 0;
        //   }
        //   if (element.dr == '-') {
        //     element.dr = 0;
        //   }
        // });
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
  
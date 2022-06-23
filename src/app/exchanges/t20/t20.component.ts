import { Component, OnInit, TemplateRef,AfterViewInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DataFormatService } from 'src/app/services/data-format.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as _ from 'lodash';
import { BetsService } from 'src/app/services/bets.service';
import { CasinoSignalrService } from 'src/app/services/casino-signalr.service';
import { ReportService } from 'src/app/report.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-t20',
  templateUrl: './t20.component.html',
  styleUrls: ['./t20.component.scss']
})
export class T20Component implements OnInit {
  [x: string]: any;
  bodyElement: any;
  leftElement:any;
  mainElement:any;
  OpenBetForm!: FormGroup;
  stakeSetting = [];
  favouriteEvents: any = [];
  match: any;
  eventBets = [];
  totalBets = 0;
  betType = 4;
  selectedMatch: any;
  fullScore: any;
  currTime = new Date();
  favouriteSubscription!: Subscription;
  casinoSubscription!: Subscription;
  eventBetsSubscription!: Subscription;
  openBet: any;
  showLoader: boolean = false;
  deviceInfo: any;
  context: any;
  url!: string;
  urlSafe!: SafeResourceUrl;
  TabSelected: string = "1";
  isData: boolean = false;
  pnl = [];
  gameType: number = 1;
  gameId!: number;
  tpData: any;
  tpMarket = [];
  clock: any;
  results = [];
  sportList = [];
  sportSubscription!: Subscription;
  fundInfo: any;
  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService,private reportService: ReportService,
    private dfService: DataFormatService,
    private casinoService: CasinoSignalrService,
    private betService: BetsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private udService: UserDataService,) {
      this.route.paramMap.subscribe(params => {
        // console.log(params);
        // this.getFavouriteMarket();
      })
    }
 

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

   ngOnInit(): void {
    this.bodyElement = document.querySelector('body');
    this.leftElement = document.querySelector('div.left-side-menu');
    this.mainElement = document.querySelector('div.main_container');
    this['getFavouriteMarket']();
    this['getBetStakeSetting']();
    this['epicFunction']();
    this['getMatchedUnmatchBets']();

    this.casinoService.connectCasino("http://75.119.147.192:11001/", this.gameType);
    this['getCasinoData']();
    this['GetRecentGameResult']();
    this['sportWise']();
  }
 
  sportWise() {
    this.sportSubscription = this.dfService.navigationSource.subscribe(data => {
      if (data != null) {
        this.sportList = this.dfService.sportEventWise(data, 0).reverse();

        // console.log(this.sportList)
      }
    });
  }

  toggleFavourite(event:any) {

    this.dfService.ToggleFavourite(event.mtBfId, false);
  }
  ngAfterViewInit() {
    (this.bodyElement as HTMLElement).classList.add('clsbetshow');
    (this.leftElement as HTMLElement).classList.add('leftmenuhide');
    (this.mainElement as HTMLElement).classList.add('casino_main');

    this.clock = (<any>$(".clock")).FlipClock(99, {
      clockFace: "Counter"
    });
  }
  // openMobileBet() {
  //   document.getElementById("mybet").style.width = "100%";
  // }

  // closeMobilebet() {
  //   document.getElementById("mybet").style.width = "0";
  // }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktop = this.deviceService.isDesktop();
    // console.log(this.deviceInfo);
    // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(isDesktop); // returns if the app is running on a Desktop browser.

    if (isMobile) {
      this.context = "Mobile";
    }
    if (isTablet) {
      this.context = "Tablet";
    }
    if (isDesktop) {
      this.context = "Desktop";
    }
  }

  initOpenBetForm() {
    let info = "device:" + this.deviceInfo.device + ", os:" + this.deviceInfo.os + ", os_version:" + this.deviceInfo.os_version + ", browser:" + this.deviceInfo.browser + ", browser_version:" + this.deviceInfo.browser_version
    // let info="";
    this.OpenBetForm = this.fb.group({
      backlay: [this.openBet.backlay],
      gameId:+[this.openBet.gameId],
      gameType: [this.openBet.gameType],
      info: [info],
      odds: [this.openBet.odds],
      runnerId: +[this.openBet.runnerId],
      runnerName: [this.openBet.runnerName],
      source: [this.context],
      stake: [""],
        tpodds: [{ value: this.openBet.odds, disabled: true }],
        profit: [0],
        loss: [0],
        mtype: [this.openBet.mtype]


    })
    // console.log(this.OpenBetForm.value);
  }

  get f() {
    return this.OpenBetForm.controls;
  }

  // getBetStakeSetting() {

  //   this.dfService.betStakeSource.subscribe(data => {

  //     if (data != null) {
  //       if (data.stake1 != 0 && data.stake2 != 0) {
  //         this.stakeSetting[0] = parseInt(data.stake1);
  //         this.stakeSetting[1] = parseInt(data.stake2);
  //         this.stakeSetting[2] = parseInt(data.stake3);
  //         this.stakeSetting[3] = parseInt(data.stake4);
  //         this.stakeSetting[4] = parseInt(data.stake5);
  //         this.stakeSetting[5] = parseInt(data.stake6);
  //         this.stakeSetting[6] = parseInt(data.stake7);
  //         this.stakeSetting[7] = parseInt(data.stake8);
  //         this.stakeSetting[8] = parseInt(data.stake9);
  //         this.stakeSetting[9] = parseInt(data.stake10);
  //         this.stakeSetting[10] = parseInt(data.stake11);
  //         this.stakeSetting[11] = parseInt(data.stake12);
  //       }
  //       // console.log(this.stakeSetting);
  //     }

  //   })
  // }

  FundExpo() {
    this.udService.FundExpo().subscribe(resp => {
      this.fundInfo = resp.data;
    }, err => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
    })
  }
  getFavouriteMarket() {

    this.favouriteSubscription = this.dfService.navigationSource.subscribe(data => {
      // console.log(data)
      if (data != null) {
        // console.log(this.dfService.favouriteEventWise(data));
        // if (this.favouriteEvents.length == 0) {
        this.favouriteEvents = this.dfService.favouriteEventWise(data);
        this.match = this.favouriteEvents[0];
        if(!this.match){
          this.router.navigate(['/dashboard'])
        }
        // }
      }
    })
  } 
  getCasinoData() {
    let oldGameId = 0;
    this.casinoSubscription = this.casinoService.casinoSource.subscribe(data => {
      // console.log(data,"casino");
      if (data != null) {
        this.tpData = data.data.t1[0];
        if(this.tpData.autotime){
          this.clock.setValue(this.tpData.autotime);
        }
        this.tpMarket = data.data.t2;
        this.gameId = this.tpData.mid;

        if (this.pnl.length == 0 || oldGameId != this.gameId) {
          this['T20ExposureBook']();
          this['GetRecentGameResult']();
          this.dfService.shareFunds(null);
          oldGameId = this.gameId;
        }
      }
    })
  }
  trackBySid(index:any, item:any) {
    return item.sid;
  }
  trackByIndex(index:any, item:any) {
    return index;
  }
  trackBySport(index:any, item:any) {
    return item.bfId;
  }

  trackByEvent(index:any, item:any) {
    return item.matchId;
  }
  GetRecentGameResult() {
    // this.reportService.GetRecentGameResult(this.gameType).subscribe(resp => {
    //   this.results = resp.data;
    // })
  }
  OpenBetSlip(backlay: any, odds: any, runnerName: any, runnerId: any, gameId: any, gameType: any) {
    this['ClearAllSelection']();
    this.openBet = {
      backlay, odds, runnerName, runnerId, gameId, gameType
    }

    this.openBet['mtype'] = "casino";
    // console.log(this.openBet);
    this.initOpenBetForm();
    if (this.context != 'Mobile') {
      window.scrollTo(0, 0);
    }
  }
  BetSubmit() {
    // console.log(this.OpenBetForm)

    if (!this.OpenBetForm.valid) {
      return;
    }
    // console.log(this.OpenBetForm.value)
    this.showLoader = true;

    if (this.OpenBetForm.value.mtype == "casino") {
      this['PlaceTpBet']();
    }

  }
  PlaceTpBet() {

    this.betService['PlaceTpBet'](this.OpenBetForm.value).subscribe((resp:any) => {

      if (resp.status == "Success") {
        this.toastr.success(resp.result);
        this['T20ExposureBook']();
        this.OpenBetForm.reset();
        this['ClearAllSelection']();
        this.dfService.shareFunds(null);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }
      else {
        this.toastr.error(resp.result);
      }
      this.showLoader = false;
    }, (err:any) => {
      if (err.status == 401) {
        this.toastr.error(err.error.description.result);
      }
      else {
        this.toastr.error("Errors Occured");
      }
      this.showLoader = false;
    })
  }
  T20ExposureBook() {
    this.betService['T20ExposureBook'](this.gameId).subscribe((resp:any) => {
      this.pnl = resp.data;
    }, (err:any) => {
      if (err.status == 401) {
        this.toastr.error(err.error.description.result);
      }
      else {
        this.toastr.error("Errors Occured");
      }
    })
  }
  convertToFloat(value:any) {
    return parseFloat(value).toFixed(2);
  }
  getPnlValue(runner: any, Pnl: any) {
    // console.log(runner,Pnl)
    if (runner.runnerName == undefined) {
      runner['runnerName'] = runner.nation;
    }
    let pnl = "";
    if (Pnl) {
      _.forEach(Pnl, (value, index) => {
        if (runner.runnerName == value.Key) {
          pnl = value.Value;
        }
      })
    }
    return pnl;
  }
  getPnlClass(runner:any, Pnl:any) {
    if (runner.runnerName == undefined) {
      runner['runnerName'] = runner.nation;
    }
    let pnlClass = "black";
    if (Pnl) {
      _.forEach(Pnl, (value, index) => {
        if (runner.runnerName == value.Key) {
          if (value.Value >= 0) {
            pnlClass = 'profit'
          }
          if (value.Value < 0) {
            pnlClass = 'loss';
          }
        }
      })
    }
    return pnlClass;
  }
  addStake(stake:any) {
    if (!this.OpenBetForm.value.stake) {
      this.OpenBetForm.controls['stake'].setValue(stake.toFixed(0));
    }
    else if (this.OpenBetForm.value.stake) {
      this.OpenBetForm.controls['stake'].setValue((parseFloat(this.OpenBetForm.value.stake) + stake).toFixed(0))
    }

    this['calcProfit']();
  }
  clearStake() {
    this.OpenBetForm.controls['stake'].setValue(null);
    this.OpenBetForm.controls['profit'].setValue(0);
    this.OpenBetForm.controls['loss'].setValue(0);

    this['calcProfit']();
  }
  ClearAllSelection() {
    this.openBet = null;
  }

  update() {
    this['calcProfit']();
  }
  
  

}
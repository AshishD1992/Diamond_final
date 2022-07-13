import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService ,ModalModule} from 'ngx-bootstrap/modal';
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
  selector: 'app-teenpatti',
  templateUrl: './teenpatti.component.html',
  styleUrls: ['./teenpatti.component.scss']
})
export class TeenpattiComponent implements OnInit {
  OpenBetForm!: FormGroup;
  stakeSetting : any= [];
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
  gameType: number = 2;
  gameId!: number;
  tpData: any;
  tpMarket: any= [];
  clock: any;
  results = [];
  sportList = [];
  sportSubscription!: Subscription;
  fundInfo: any;
  open: boolean = true;
   disabled: boolean = true;
  modalRef!: BsModalRef;
   constructor(private modalService: BsModalService,
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

      })
    }

   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

   ngOnInit(): void {

    this['getFavouriteMarket']();
    this['getBetStakeSetting']();
    this['epicFunction']();
    this['getMatchedUnmatchBets']();

    this.casinoService.connectCasino("http://45.76.155.250:11002/", this.gameType);
    this.getCasinoData();
    this['GetRecentGameResult']();
    this['sportWise']();
  }

  sportWise() {
    this.sportSubscription = this.dfService.navigation$.subscribe(data => {
      if (data != null) {
        this.sportList = this.dfService.sportEventWise(data, 0).reverse();

        // console.log(this.sportList)
      }
    });
  }


  ngAfterViewInit() {
       this.clock = (<any>$(".clock")).FlipClock(99, {
      clockFace: "Counter"
    });
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktop = this.deviceService.isDesktop();

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

  getBetStakeSetting() {

    this.dfService.betStake$.subscribe(data => {

      if (data != null) {
        if (data.stake1 != 0 && data.stake2 != 0) {
          this.stakeSetting[0] = parseInt(data.stake1);
          this.stakeSetting[1] = parseInt(data.stake2);
          this.stakeSetting[2] = parseInt(data.stake3);
          this.stakeSetting[3] = parseInt(data.stake4);
          this.stakeSetting[4] = parseInt(data.stake5);
          this.stakeSetting[5] = parseInt(data.stake6);
          this.stakeSetting[6] = parseInt(data.stake7);
          this.stakeSetting[7] = parseInt(data.stake8);
          this.stakeSetting[8] = parseInt(data.stake9);
          this.stakeSetting[9] = parseInt(data.stake10);
          this.stakeSetting[10] = parseInt(data.stake11);
          this.stakeSetting[11] = parseInt(data.stake12);
        }
        // console.log(this.stakeSetting);
      }

    })
  }

  FundExpo() {
    this.udService.FundExpo().subscribe(resp => {
      this.fundInfo = resp.data;
    }, err => {
      if (err.status == 401) {

      }
    })
  }
  getFavouriteMarket() {

    this.favouriteSubscription = this.dfService.navigation$.subscribe(data => {

      if (data != null) {

        this.favouriteEvents = this.dfService.favouriteEventWise(data);
        this.match = this.favouriteEvents[0];
        if(!this.match){
          this.router.navigate(['/home'])
        }

      }
    })
  }
  getCasinoData() {
    let oldGameId=0;
    this.casinoSubscription = this.casinoService.casinoSource.subscribe(data => {
      console.log(data,'casino');
      if (data != null) {
        this.tpMarket = data.data.bf;
        this.gameId = this.tpMarket[0].marketId;
        this.clock.setValue(this.tpMarket[0].lasttime);

        if (this.pnl.length == 0 || oldGameId!=this.gameId) {
          this.T20ExposureBook();
          this.GetRecentGameResult();
          this.dfService.shareFunds(null);
          oldGameId=this.gameId;

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

  // incOdds() {
  //   if (!this.OpenBetForm.value.odds) {
  //     this.OpenBetForm.controls['odds'].setValue(1.00);
  //   }
  //   if (parseFloat(this.OpenBetForm.value.odds) >= 1000) {
  //     this.OpenBetForm.controls['odds'].setValue(1000);
  //     this.calcProfit();
  //     return false;
  //   }
  //   let odds = parseFloat(this.OpenBetForm.value.odds);
  //   this.OpenBetForm.controls['odds'].setValue(this.oddsDecimal(odds + this.oddsDiffCalc(odds)));

  //   this.calcProfit();
  //   // this.calcExposure(bet);
  // }

  // decOdds() {
  //   if (this.OpenBetForm.value.odds == "" || this.OpenBetForm.value.odds == null || parseFloat(this.OpenBetForm.value.odds) <= 1.01) {
  //     this.OpenBetForm.controls['odds'].setValue(1.01);
  //     this.calcProfit();
  //     return false;
  //   }
  //   let odds = parseFloat(this.OpenBetForm.value.odds);
  //   this.OpenBetForm.controls['odds'].setValue(this.oddsDecimal(odds - this.oddsDiffCalc(odds)));

  //   this.calcProfit();
  //   // this.calcExposure(bet);
  // }

  // incStake() {
  //   if (!this.OpenBetForm.value.stake) {
  //     this.OpenBetForm.controls['stake'].setValue(0);
  //   }

  //   if (this.OpenBetForm.value.stake > -1) {
  //     let stake = parseInt(this.OpenBetForm.value.stake);
  //     this.OpenBetForm.controls['stake'].setValue(stake + this.stakeDiffCalc(stake));
  //     this.calcProfit();
  //   }
  // }

  // decStake() {

  //   if (this.OpenBetForm.value.stake <= 0) {
  //     this.OpenBetForm.controls['stake'].setValue("");
  //     return false;
  //   }

  //   if (!this.OpenBetForm.value.stake) {
  //     this.OpenBetForm.controls['stake'].setValue(0);
  //   }

  //   if (this.OpenBetForm.value.stake > -1) {
  //     let stake = parseInt(this.OpenBetForm.value.stake);
  //     this.OpenBetForm.controls['stake'].setValue(stake - this.stakeDiffCalc(stake));
  //     this.calcProfit();
  //   }
  // }

  calcProfit() {
    if (this.OpenBetForm.value.stake &&
      this.OpenBetForm.value.odds &&
      this.OpenBetForm.value.mtype == 'casino') {
      if (this.OpenBetForm.value.backlay == "back") {
        this.OpenBetForm.controls['profit'].setValue(
          ((parseFloat(this.OpenBetForm.value.odds) - 1) * this.OpenBetForm.value.stake).toFixed(2));
        this.OpenBetForm.controls['loss'].setValue(this.OpenBetForm.value.stake);
      } else {
        this.OpenBetForm.controls['loss'].setValue(
          ((parseFloat(this.OpenBetForm.value.odds) - 1) * this.OpenBetForm.value.stake).toFixed(2));
        this.OpenBetForm.controls['profit'].setValue(this.OpenBetForm.value.stake);
      }

    }


    if (this.OpenBetForm.value.stake == null) {
      this.OpenBetForm.controls['profit'].setValue(0);
    }
  }

  oddsDecimal(value:any) {
    return (value == null || value == '' || (parseFloat(value) > 19.5)) ? value : ((parseFloat(value) > 9.5) ? parseFloat(value).toFixed(1) : parseFloat(value).toFixed(2));
  }

  oddsDiffCalc(currentOdds:any) {
    var diff;
    if (currentOdds < 2) {
      diff = 0.01
    } else if (currentOdds < 3) {
      diff = 0.02
    } else if (currentOdds < 4) {
      diff = 0.05
    } else if (currentOdds < 6) {
      diff = 0.10
    } else if (currentOdds < 10) {
      diff = 0.20
    } else if (currentOdds < 20) {
      diff = 0.50
    } else if (currentOdds < 30) {
      diff = 1.00
    } else {
      diff = 2.00
    }
    return diff
  }

  stakeDiffCalc(currentStake:any) {
    var diff;
    if (currentStake <= 50) {
      diff = 5
    } else if (currentStake <= 100) {
      diff = 10
    } else if (currentStake <= 1000) {
      diff = 100
    } else if (currentStake <= 10000) {
      diff = 1000
    } else if (currentStake <= 100000) {
      diff = 10000
    } else if (currentStake <= 1000000) {
      diff = 100000
    } else if (currentStake <= 10000000) {
      diff = 1000000
    } else if (currentStake <= 100000000) {
      diff = 10000000
    } else {
      diff = 100000000
    }
    return diff
  }

  //#endregion  //CLOSE BET SLIP CALC


  //#region
  getDataByType(betType:any) {
    this.betType = betType;
  }
  getMatchedUnmatchBets() {
    // let betMatchId = matchId;
    if (this.eventBetsSubscription) {
      this.eventBetsSubscription.unsubscribe();
    }
    let allbets;
    this.eventBetsSubscription = this.dfService.allMatchUnmatchBetsSource.subscribe(data => {
      // console.log(data);

      if (data != null) {
        if (this.betType == 4) {
          allbets = this.dfService.matchUnmatchBetsFormat(data._userTpBets[this.gameId]);
          this.eventBets = allbets.matchWiseBets;
          this.totalBets = allbets.totalBets;
        }
        // console.log(this.eventBets)
      }
    })
  }

  trackByBet(bet: any) {
    return bet.id;
  }

  //#endregion

  ngOnDestroy() {

    this.casinoService.UnsuscribeCasino(this.gameType);
    if (this.favouriteSubscription) {
      this.favouriteSubscription.unsubscribe();
    }
    if (this.casinoSubscription) {
      this.casinoSubscription.unsubscribe();
    }
    if (this.eventBetsSubscription) {
      this.eventBetsSubscription.unsubscribe();
    }
  }



   log(isOpened: boolean){
    console.log(isOpened);
 }
}

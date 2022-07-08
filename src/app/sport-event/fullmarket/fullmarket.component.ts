import { Component, OnInit,OnDestroy, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { UserDataService } from '../../services/user-data.service';
import { DataFormatService } from '../../services/data-format.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MarketsService } from '../../services/markets.service';

import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { FancyService } from '../../services/fancy.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BetsService } from '../../services/bets.service';
  // import { DeviceDetectorService } from 'ngx-device-detector';
import { ScoreService } from '../../services/score.service';
import { TokenService } from '../../services/token.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fullmarket',
  templateUrl: './fullmarket.component.html',
  styleUrls: ['./fullmarket.component.scss']
})
export class FullmarketComponent implements OnInit, AfterViewInit {

  // @ViewChild('betPlaced') betPlacedRef: ElementRef;
  // @ViewChild('unmatchNotAllow') unmatchNotAllowRef: ElementRef;

  
  OpenBetForm!: FormGroup;

  accountInfo: any;
  fancyHubAddress = "http://173.249.21.26:16511";

  stakeSetting:any = [];
  favouriteEvents: any = [];
  hubAddressData: any;
  allMarketData: any = [];
  fancyExposures: any;
  fancyBookData = [];
  eventBets = [];
  totalBets = 0;
  betType = 4;
  selectedMatch: any;

  fullScore: any;

  currTime = new Date();

  favouriteSubscription!: Subscription;
  marketSuscription!: Subscription;
  marketErrSuscription!: Subscription;
  fancySubscription!: Subscription;
  fancyExpoSubscription!: Subscription;
  eventBetsSubscription!: Subscription;
  UserDescSubscription!: Subscription;
  BetStakeSubscription!: Subscription;
  UserSettingSubscription!: Subscription;


  openBet: any;
  showLoader: boolean = false;

  deviceInfo: any;
  context: any;

  // url: string;
  // urlSafe: SafeResourceUrl;

  // liveUrl: string;
  // liveUrlSafe: SafeResourceUrl;

  activeTab: string = "liveVideo";
  videoEnabled: boolean = false;
  // width: number = 300;
  // height: number = 190;

  width: number = 450;
  height: number = 247;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    // console.log(event);
    this.width = event.target.innerWidth;
    this.height = Math.ceil(this.width / 1.778);
    // this.setIframeUrl();
  };

  ipInfo: any;
  bookExpoCall: boolean = false;

  tango = 6;

  constructor(
    private udService: UserDataService,
    private dfService: DataFormatService,
    private mktService: MarketsService,
    private fancyService: FancyService,
    private betService: BetsService,
    private scoreService: ScoreService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private deviceService: DeviceDetectorService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService
  ) {
    this.route.params.subscribe(params => {
      // console.log(params);
      // this.getFavouriteMarket();
    })

    // enable vibration support
    // navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.vibrate;
    navigator.vibrate = navigator.vibrate;
   }

  ngOnInit(): void {
    // Just Study

    this.dfService.currentDateTimeSource.subscribe(data => {
      if (data) {
        this.currTime = data;
      }
    });
    // this.GetIpAddrress();
    this.getFavouriteMarket();
    this.getBetStakeSetting();
    // this.epicFunction();
    this.getFancyExposure();
    this.UserDescription();

$(document).on('click', '.tab-list li a', function() {
  var $this = $(this),
      $tabList = $this.parents('ul'),
      _idx = $this.closest('li').index();
  
  $tabList.children().eq(_idx).addClass('in').siblings().removeClass('in');
  $tabList.next().children().eq(_idx).addClass('in').siblings().removeClass('in');
});
  }


  // epicFunction() {
  //   this.deviceInfo = this.deviceService.getDeviceInfo();
  //   const isMobile = this.deviceService.isMobile();
  //   const isTablet = this.deviceService.isTablet();
  //   const isDesktop = this.deviceService.isDesktop();
  //   // console.log(this.deviceInfo);
  //   // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
  //   // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
  //   // console.log(isDesktop); // returns if the app is running on a Desktop browser.

  //   if (isMobile) {
  //     this.context = "Mobile";
  //   }
  //   if (isTablet) {
  //     this.context = "Tablet";
  //   }
  //   if (isDesktop) {
  //     this.context = "Desktop";
  //   }
  //   if (!isDesktop) {
  //     this.width = window.innerWidth;
  //     this.height = Math.ceil(this.width / 1.778);
  //   }
  // }

  initOpenBetForm() {
    let info = "device:" + this.deviceInfo.device + ", os:" + this.deviceInfo.os + ", os_version:" + this.deviceInfo.os_version + ", browser:" + this.deviceInfo.browser + ", browser_version:" + this.deviceInfo.browser_version

    this.OpenBetForm = this.fb.group({
      sportId: [this.openBet.sportId],
      tourid: [this.openBet.tourid],
      matchBfId: [this.openBet.matchBfId],
      matchId: [this.openBet.matchId],
      eventId: [this.openBet.matchId],
      bfId: [this.openBet.bfId],
      mktBfId: [this.openBet.bfId],
      mktId: [this.openBet.mktId],
      marketId: [this.openBet.mktId],
      matchName: [this.openBet.matchName],
      marketName: [this.openBet.marketName],
      mktname: [this.openBet.marketName],
      isInplay: [this.openBet.isInplay],
      runnerName: [this.openBet.runnerName],
      odds: [this.openBet.odds],
      bookodds: [{ value: this.openBet.odds, disabled: true }],
      backlay: [this.openBet.backlay],
      yesno: [this.openBet.backlay == "back" ? 'yes' : 'no'],
      score: [this.openBet.score],
      rate: [this.openBet.rate],
      fancyId: [this.openBet.fancyId],
      bookId: [this.openBet.bookId],
      runnerId: [this.openBet.runnerId],
      bookType: [this.openBet.bookType],
      stake: [""],
      profit: [0],
      loss: [0],
      mtype: [this.openBet.mtype],
      info: [info],
      source: [this.context],
      ipAddress: [this.tokenService.getIpAddrress()]
      // ipAddress:[this.ipInfo.ip]

    })
    // console.log(this.OpenBetForm.value);
  }
  get f() {
    return this.OpenBetForm.controls;
  }

  // GetIpAddrress() {
  //   this.tokenService.shareIPInfo.subscribe(resp=>{
  //     this.ipInfo = resp;
  //   })
  // }

  UserDescription() {
    this.UserDescSubscription = this.dfService.userDescription$.subscribe(resp => {
      if (resp) {
        if (resp.fHub) {
          this.fancyHubAddress = resp.fHub;
        }
      }
    })
  }

  getBetStakeSetting() {

    this.BetStakeSubscription = this.dfService.betStake$.subscribe(data => {

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



  HubAddress(market:any) {
    this.udService.HubAddress(market.id).subscribe(resp => {
      console.log(resp)
      this.hubAddressData = resp;
      if (this.hubAddressData.hubAddress) {
        this.mktService.connectMarket(this.hubAddressData.hubAddress, this.allMarketData);
        this.getMarketRunner();
      }
      if (this.hubAddressData.fancyHubAddress && !this.fancySubscription) {
        // this.hubAddressData.fancyHubAddress = "http://178.18.240.118:16511";
        this.hubAddressData.fancyHubAddress = this.fancyHubAddress;
        this.fancyService.connectFancy(this.hubAddressData.fancyHubAddress, this.favouriteEvents);
        this.getFancyData();
        console.log(this.getFancyData());
      }
    }, err => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
    })
  }

  getMarketRunner() {
    this.marketSuscription = this.mktService.marketSource.subscribe(data => {
      // console.log(data);
      if (data != null) {
        // console.log(this.favouriteEvents)
        _.forEach(this.favouriteEvents, (item:any, index:any) => {

          // if (item.settings && this.UserSettingData) {

          //   if (this.UserSettingData[item.sportId]) {
          //     item.settings = this.UserSettingData[item.sportId];
          //   }
          // }

          _.forEach(item.markets, (item3:any, index3:any) => {
            if (item3.bfId == data.marketid) {

              item.status = data.Status.trim();
              item3.status = data.Status.trim();
              let runnersData = item3.runners;
              _.forEach(runnersData, (item4:any, i:any) => {
                if (item4.runnerName == data.runner) {

                  this.favouriteEvents[index].markets[index3].runners[i] = data;
                  this.favouriteEvents[index].markets[index3].runners[i]["runnerName"] = data.runner;
                  this.favouriteEvents[index].markets[index3].runners[i]["status"] = data.runnerStatus;
                  this.favouriteEvents[index].markets[index3].runners[i]["selectionId"] = data.selectionid;
                  // if (item.selectionid != 0) {
                  //   this.checkOddsChange(item4, data, null);
                  // }
                }
              })
            }
          })
        });
      }
    });

    this.marketErrSuscription = this.mktService.marketErrSource.subscribe(data => {

      if (data) {
        console.log(data)
        // if (this.allMarketData[0]) {
        //   this.HubAddress(this.allMarketData[0]);
        // }
      }
    });
  }

  getFancyData() {
    this.fancySubscription = this.fancyService.fancySource.subscribe(data => {
console.log(data);
      if (data != null) {
        _.forEach(this.favouriteEvents, (item, index) => {
          if (item.id == data.matchId) {
            item.fancyData = data.data;

            let bookRatesExpo = item.bookRates;

            if (item.bmSettings) {
              _.forEach(data.bookRates, (bookItem, index2) => {
                if (bookItem) {
                  bookItem.minStake = item.bmSettings.minStake;
                  bookItem.maxStake = item.bmSettings.maxStake;
                  bookItem['maxProfit'] = item.bmSettings.maxProfit;

                  if (bookRatesExpo[index2]) {
                    if (bookItem.id == bookRatesExpo[index2].id) {
                      if (bookRatesExpo[index2]) {
                        if (bookRatesExpo[index2].pnl) {
                          bookItem['pnl'] = bookRatesExpo[index2].pnl;
                        }
                      }
                    }
                  }
                }
              })
            }

            // _.forEach(item.bookRates, (bookItem, index2) => {
            //   _.forEach(data.bookRates, (bookItem2, index3) => {
            //     if(bookItem.id==bookItem2.id){
            //       if(bookItem.pnl){
            //         bookItem2['pnl'] = bookItem.pnl;
            //       }
            //     }
            //   })
            // })


            if (!this.bookExpoCall) {
              item.bookRates = data.bookRates;
            }
            if (bookRatesExpo.length > 0) {
              _.forEach(item.bookRates, (bookItem, index2) => {
                if (bookRatesExpo[index2]) {
                  if (!bookRatesExpo[index2].pnl) {
                    this.BMExposureBook(bookItem, item.markets[0].id);
                    this.bookExpoCall = true;
                  }
                  else {
                    if (bookRatesExpo[index2]) {
                      if (bookItem.id == bookRatesExpo[index2].id) {
                        bookItem['pnl'] = bookRatesExpo[index2].pnl;
                        bookItem['newpnl'] = bookRatesExpo[index2].newpnl;
                      }
                    }

                    // this.bookExpoCall = false;
                  }
                }


              })
            }

            _.forEach(item.fancyData, (fanyItem) => {

              if (this.openBet) {
                if (this.openBet.runnerName == fanyItem.name && fanyItem.ballStatus != '') {
                  this.ClearAllSelection();
                }
              }
              if (this.fancyExposures) {
                let fancyExpo = this.fancyExposures[fanyItem.name];
                if (fancyExpo != undefined) {
                  fanyItem['pnl'] = fancyExpo;
                }
              }
            });
          }
        })
      }
    })
  }




  getFavouriteMarket() {

    let favArray :any = [];
    let oldFavArray:any = [];

    let IsTvShow = false;

    this.favouriteSubscription = this.dfService.navigation$.subscribe(data => {
      // console.log(data)
      if (data != null) {
        // console.log(this.dfService.favouriteEventWise(data));
        if (this.favouriteEvents.length == 0) {
          this.favouriteEvents = this.dfService.favouriteEventWise(data);
          // console.log(this.favouriteEvents)
          // if(this.favouriteEvents[0].videoEnabled){
          //   this.openTv(this.favouriteEvents[0])
          // }
          this.allMarketData = [];
          _.forEach(this.favouriteEvents, (item:any) => {
            _.forEach(item.markets, (item2:any) => {
              this.allMarketData.push(item2);
              this.ExposureBook(item2);
            });
            _.forEach(item.bookRates, (item2:any) => {
              this.BMExposureBook(item2, item.markets[0].id);
            });
            this.GetScoreId(item);
          });


          oldFavArray = JSON.parse(this.dfService.GetFavourites()!);
          if (this.hubAddressData == undefined && oldFavArray != null) {
            console.log(oldFavArray)
            if (oldFavArray.length > 0) {
              if (this.allMarketData[0]) {
                this.HubAddress(this.allMarketData[0]);
              }
            }
            if (this.favouriteEvents.length > 0) {
              let matchId = this.favouriteEvents[this.favouriteEvents.length - 1].id;
              this.getMatchedUnmatchBets(matchId);
            }
            else{
              this.router.navigate(['/dashboard']);
            }
          }
        }

        favArray = JSON.parse(this.dfService.GetFavourites()!);
        if (oldFavArray != null && favArray != null) {
          if (favArray.length != oldFavArray.length) {
            this.favouriteEvents = this.dfService.favouriteEventWise(data);
            oldFavArray = JSON.parse(this.dfService.GetFavourites()!);

            // _.forEach(this.allMarketData, (item2) => {
            //   this.mktService.UnsuscribeSingleMarket(item2.bfId);
            // });
            this.mktService.UnsuscribeMarkets(this.allMarketData);
            this.fancyService.UnsuscribeFancy(this.favouriteEvents);

            this.allMarketData = [];
            _.forEach(this.favouriteEvents, (item:any) => {
              _.forEach(item.markets, (item2:any) => {
                this.allMarketData.push(item2);
                this.ExposureBook(item2);
              });
              _.forEach(item.bookRates, (item2:any) => {
                this.BMExposureBook(item2, item.markets[0].id);
              });
            });
            this.mktService.connectMarket(this.hubAddressData.hubAddress, this.allMarketData);
            this.fancyService.connectFancy(this.hubAddressData.fancyHubAddress, this.favouriteEvents);

            if (this.favouriteEvents.length > 0) {
              let matchId = this.favouriteEvents[this.favouriteEvents.length - 1].id;
              this.getMatchedUnmatchBets(matchId);
            }
            else {
              this.router.navigate(['/dashboard']);
            }

          }
        }

      }
    })
  }

  openMatchDateTime(matchDate:any, type:any) {
    let countDownClock = "";
    // if(this.currTime)
    let matchDate1 = new Date(matchDate)
    let currTime = new Date(this.currTime);

    if (type == 2) {
      matchDate1.setHours(matchDate1.getHours() - 1);
    }

    let dateTime = matchDate1.getTime() - currTime.getTime();
    let day = Math.floor(dateTime / (1000 * 3600 * 24));
    // console.log('day '+day)
    let hrs = (Math.floor(dateTime / (1000 * 3600)) - (day * 24));
    // console.log('hrs '+hrs)
    // console.log('minutes '+parseInt(dateTime/(1000 * 60)))
    let minutes = (Math.floor(dateTime / (1000 * 60)) - ((day * 24 * 60) + (hrs * 60)));
    // console.log('minutes '+minutes)
    var seconds = (Math.floor(dateTime / (1000)) - ((day * 24 * 3600) + (hrs * 3600) + (minutes * 60)));
    // console.log('seconds '+seconds)
    // $scope.countDownClock = day + 'd ' + hrs + 'h ' + minutes + 'm ' + seconds + 's';
    return countDownClock = day + 'd ' + hrs + 'h ' + minutes + 'm ' + seconds + 's';
  }

  GetScoreId(event:any) {
    if (event.sportId == 4) {
      this.scoreService.GetScoreId(event.bfId).subscribe(resp => {
        if (resp.scoreId != 0) {
          let url = 'https://shivexch.com/sport_score_api/cricketscore/index.html?scoreId=' + resp.scoreId + '&matchDate=' + event.matchDate;

          event['sportradar_url'] = this.sanitizer.bypassSecurityTrustResourceUrl(url);;
        }
      })
    }

  }

  getBFScore(event:any) {
    // let favEventIds = JSON.parse(this.dfService.GetFavourites()).toString();
    if ((event.sportId == 4 && !event.sportradar_url) || event.sportId == 2) {
      this.scoreService.getBFCricScore(event.bfId).subscribe(resp => {
        _.forEach(resp, (score:any) => {
          if (event.bfId == score.eventId) {
            event['fullScore'] = score;
          }
        });
      })
    }
    else if (event.sportId == 1) {
      this.scoreService.getBFSTScore(event.bfId).subscribe(resp => {
        _.forEach(resp, (score:any) => {
          if (event.bfId == score.eventId) {
            event['fullScore'] = score;
          }
        });
      })
    }
  }

  // scoreRun(fullScore:any) {
  //   var displayRun = "";
  //   if (fullScore.stateOfBall != undefined) {
  //     if (fullScore.stateOfBall.appealTypeName == "Not Out") {
  //       if (fullScore.stateOfBall.dismissalTypeName == "Not Out") {
  //         if (fullScore.stateOfBall.bye != "0") {
  //           return (displayRun =
  //             fullScore.stateOfBall.bye + " Run (Bye)");
  //         }
  //         if (fullScore.stateOfBall.legBye != "0") {
  //           return (displayRun =
  //             fullScore.stateOfBall.legBye + " Run (Leg Bye)");
  //         }
  //         if (fullScore.stateOfBall.wide != "0") {
  //           return (displayRun =
  //             fullScore.stateOfBall.wide + " Run (Wide)");
  //         }
  //         if (fullScore.stateOfBall.noBall != "0") {
  //           return (displayRun =
  //             fullScore.stateOfBall.batsmanRuns + " Run (No Ball)");
  //         }
  //         if (fullScore.stateOfBall.batsmanRuns == "0") {
  //           return (displayRun = "No Run");
  //         } else if (fullScore.stateOfBall.batsmanRuns == "1") {
  //           return (displayRun =
  //             fullScore.stateOfBall.batsmanRuns + " Run");
  //         } else if (parseInt(fullScore.stateOfBall.batsmanRuns) > 1) {
  //           return (displayRun =
  //             fullScore.stateOfBall.batsmanRuns + " Runs");
  //         }
  //         // if (fullScore.stateOfBall.batsmanRuns=="0" && fullScore.stateOfBall.legBye=="0") {
  //         //  displayRun="No Run";
  //         // }
  //         // else if (fullScore.stateOfBall.batsmanRuns!="0" && fullScore.stateOfBall.legBye=="0") {
  //         //  displayRun=fullScore.stateOfBall.batsmanRuns+" Runs";
  //         // }
  //         // else if (fullScore.stateOfBall.batsmanRuns=="0" && fullScore.stateOfBall.legBye!="0") {
  //         //  displayRun=fullScore.stateOfBall.legBye+" Runs (Leg Bye)";
  //         // }
  //       } else {
  //         return (displayRun =
  //           "WICKET (" + fullScore.stateOfBall.dismissalTypeName + ")");
  //       }
  //     } else {
  //       if (fullScore.stateOfBall.outcomeId == "0") {
  //         return (displayRun =
  //           "Appeal : " + fullScore.stateOfBall.appealTypeName);
  //       } else {
  //         return (displayRun = "WICKET (Not Out)");
  //       }
  //     }
  //   }

  //   // return displayRun;
  // };

  // getCardTeam(card:any, team:any) {
  //   if (card == "Goal" && team == "home") {
  //     return "ball-soccer team-a";
  //   } else if (card == "YellowCard" && team == "home") {
  //     return "card-yellow team-a";
  //   } else if (card == "Goal" && team == "away") {
  //     return "ball-soccer team-b";
  //   } else if (card == "YellowCard" && team == "away") {
  //     return "card-yellow team-b";
  //   }
  //   // else if (card=="SecondHalfKickOff") {
  //   //  return 'ball-soccer team-a';
  //   // }
  //   else if (card <= 10) {
  //     return 1;
  //   } else if (card <= 20) {
  //     return 2;
  //   } else if (card <= 30) {
  //     return 3;
  //   } else if (card <= 40) {
  //     return 4;
  //   } else if (card <= 50) {
  //     return 5;
  //   } else if (card <= 60) {
  //     return 6;
  //   } else if (card <= 70) {
  //     return 7;
  //   } else if (card <= 80) {
  //     return 8;
  //   } else if (card <= 90) {
  //     return 9;
  //   } else if (card <= 100) {
  //     return 10;
  //   }
  // };


  // openTv(match:any) {
  //   if (this.selectedMatch) {
  //     if (this.selectedMatch.bfId != match.bfId) {
  //       this.selectedMatch = match;
  //       this.setIframeUrl();
  //     }
  //     else {
  //       this.selectedMatch = null;
  //     }
  //   }
  //   else {
  //     this.selectedMatch = match;
  //     this.setIframeUrl();
  //   }

  // }

  ngAfterViewInit() {
    $(".dt-icon-close").click(function () {
      console.log('closed')
      // this.selectedMatch = null;
    });
  }

  // setIframeUrl() {
  //   if (this.selectedMatch) {

  //     this.url = "https://videoplayer.betfair.com/GetPlayer.do?tr=1&eID=" + this.selectedMatch.bfId + "&width=" + this.width + "&height=" + this.height + "&allowPopup=true&contentType=viz&statsToggle=hide&contentOnly=true"
  //     this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

  //     // this.liveUrl = "http://tv.allexch.com/index.html?token=696363a6-035b-450c-8ec6-312e779732ac&mtid=" + this.selectedMatch.bfId;
  //     this.liveUrl = this.selectedMatch.tvConfig.link;
  //     this.liveUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.liveUrl);

  //     if (this.selectedMatch.videoEnabled) {
  //       this.videoEnabled = this.selectedMatch.videoEnabled;
  //     }
  //   }
  // }


  //#region

  // checkOddsChange(OldValue:any, NewValue:any, type:any) {

  //   if (type == 'fancy') {
  //     if (OldValue.noScore != NewValue.noScore) {
  //       const noScore = $('#' + NewValue.id + ' .lay');
  //       noScore.addClass('yello');
  //       this.removeChangeClass(noScore);
  //     }
  //     if (OldValue.yesScore != NewValue.yesScore) {
  //       const yesScore = $('#' + NewValue.id + ' .lay');
  //       yesScore.addClass('yello');
  //       this.removeChangeClass(yesScore);
  //     }

  //   }
  //   else {
  //     if (OldValue.back1 != NewValue.back1 || OldValue.backSize1 != NewValue.backSize1) {
  //       const back1 = $('#' + NewValue.selectionId + ' .back_1');
  //       back1.addClass('yello');
  //       this.removeChangeClass(back1);
  //     }
  //     if (OldValue.back2 != NewValue.back2 || OldValue.backSize2 != NewValue.backSize2) {
  //       const back2 = $('#' + NewValue.selectionId + ' .back_2');
  //       back2.addClass('yello');
  //       this.removeChangeClass(back2);
  //     }
  //     if (OldValue.back3 != NewValue.back3 || OldValue.backSize3 != NewValue.backSize3) {
  //       const back3 = $('#' + NewValue.selectionId + ' .back_3');
  //       back3.addClass('yello');
  //       this.removeChangeClass(back3);
  //     }
  //     if (OldValue.lay1 != NewValue.lay1 || OldValue.laySize1 != NewValue.laySize1) {

  //       if (this.tango == 18) {
  //         return false;
  //       }
  //       const lay1 = $('#' + NewValue.selectionId + ' .lay_1');
  //       lay1.addClass('yello');
  //       this.removeChangeClass(lay1);
  //     }
  //     if (OldValue.lay2 != NewValue.lay2 || OldValue.laySize2 != NewValue.laySize2) {
  //       if (this.tango == 18) {
  //         return false;
  //       }
  //       const lay2 = $('#' + NewValue.selectionId + ' .lay_2');
  //       lay2.addClass('yello');
  //       this.removeChangeClass(lay2);
  //     }
  //     if (OldValue.lay3 != NewValue.lay3 || OldValue.laySize3 != NewValue.laySize3) {
  //       if (this.tango == 18) {
  //         return false;
  //       }
  //       const lay3 = $('#' + NewValue.selectionId + ' .lay_3');
  //       lay3.addClass('yello');
  //       this.removeChangeClass(lay3);
  //     }
  //   }



  // }

  removeChangeClass(changeClass:any) {
    setTimeout(() => {
      changeClass.removeClass('yello');
    }, 300);
  }
  //#endregion


  OpenBetSlip(sportId: any, tourid: any, matchBfId: any, matchId: any, bfId: null, mktId: null, matchName: any, marketName: any, isInplay: any, runnerName: any, odds: any, backlay: any, score: any, rate: any, fancyId: null, bookId: null, runnerId: any, bookType: null) {

    this.openBet = {
      sportId, tourid, matchBfId, matchId, bfId, mktId, matchName, marketName, isInplay, runnerName, odds, backlay, score, rate, fancyId, bookId, runnerId, bookType
    }

    if (bfId != null && mktId != null && bookType == null) {
      this.openBet['mtype'] = "market";
    }

    if (bookId != null && bookType != null) {
      this.openBet['mtype'] = "book";
    }
    if (fancyId != null) {
      this.openBet['mtype'] = "fancy";
    }
    // console.log(this.openBet);
    this.initOpenBetForm();
    if (this.context != 'Mobile') {

    }
  }

  BetSubmit() {
    // console.log(this.OpenBetForm)

    if (!this.OpenBetForm.valid) {
      return;
    }
    // console.log(this.OpenBetForm.value)
    this.showLoader = true;

    if (this.OpenBetForm.value.mtype == "market") {
      this.PlaceMOBet();
    }
    else if (this.OpenBetForm.value.mtype == "fancy") {
      this.PlaceFancyBet();
    }
    else if (this.OpenBetForm.value.mtype == "book") {
      this.PlaceBookBet();
    }

  }

  PlaceMOBet() {

    this.betService.PlaceMOBet(this.OpenBetForm.value).subscribe(resp => {

      if (resp.status == "Success") {
        this.toastr.success(resp.result);
        // this.betPlacedPlay();
        this.afterPlaceBetExposure();
        this.OpenBetForm.reset();
        this.ClearAllSelection();
        this.dfService.shareFunds(null);
      }
      else {
        this.toastr.error(resp.result);

        if (resp.result == 'Unmatched bets not allowed') {
          // this.unmatchNotAllowPlay();
        }
      }
      this.showLoader = false;
    }, err => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
      else {
        this.toastr.error("Errors Occured");
      }
      this.showLoader = false;
    })
  }

  PlaceFancyBet() {

    this.betService.PlaceFancyBet(this.OpenBetForm.value).subscribe((resp: { status: string; result: string | undefined; }) => {

      if (resp.status == "Success") {
        this.toastr.success(resp.result);
        // this.betPlacedPlay();
        this.OpenBetForm.reset();
        this.ClearAllSelection();
        this.dfService.shareFunds(null);
      }
      else {
        this.toastr.error(resp.result);
      }
      this.showLoader = false;
    }, (err: { status: number; }) => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
      else {
        this.toastr.error("Errors Occured");
      }
      this.showLoader = false;
    })
  }

  PlaceBookBet() {
    this.betService.PlaceBookBet(this.OpenBetForm.value).subscribe((resp: { status: string; result: string | undefined; }) => {

      if (resp.status == "Success") {
        this.toastr.success(resp.result);
        // this.betPlacedPlay();
        this.afterPlaceBetExposure();
        this.OpenBetForm.reset();
        this.ClearAllSelection();
        this.dfService.shareFunds(null);
      }
      else {
        this.toastr.error(resp.result);
      }
      this.showLoader = false;
    }, (err: { status: number; }) => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
      else {
        this.toastr.error("Errors Occured");
      }
      this.showLoader = false;
    })
  }

  // betPlacedPlay() {
  //   if (navigator.vibrate) {
  //     // vibration API supported
  //     // vibrate for one second
  //     navigator.vibrate(500);
  //   }
  //   this.betPlacedRef.nativeElement.play();

  // }
  // unmatchNotAllowPlay() {
  //   this.unmatchNotAllowRef.nativeElement.play();
  // }

  afterPlaceBetExposure() {
    _.forEach(this.favouriteEvents, (item: { markets: any; bookRates: any; }) => {
      _.forEach(item.markets, (item2: { id: any; }) => {
        if (this.OpenBetForm.value.mktId == item2.id) {
          this.ExposureBook(item2);
        }
      });
      _.forEach(item.bookRates, (item2: { id: any; }) => {
        if (this.OpenBetForm.value.bookId == item2.id) {
          this.BMExposureBook(item2, this.OpenBetForm.value.marketId);
        }
      });
    });

  }

  ExposureBook(market: { [x: string]: any; id: any; }) {
    this.betService.ExposureBook(market.id).subscribe((resp: { data: any; }) => {
      market['pnl'] = resp.data;
    }, (err: { status: number; }) => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
      else {
        this.toastr.error("Errors Occured");
      }
    })
  }

  BMExposureBook(market: { [x: string]: any; id: any; }, marketId: any) {
    this.bookExpoCall = true;
    this.betService.BMExposureBook(marketId, market.id).subscribe((resp: { data: any; }) => {
      market['pnl'] = resp.data;
      this.bookExpoCall = false;
    }, (err: { status: number; }) => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
      else {
        this.toastr.error("Errors Occured");
      }
      this.bookExpoCall = false;
    })
  }

  getFancyBook(matchId: any, fancyId: any) {
    this.betService.Fancybook(matchId, fancyId).subscribe(resp=> {
      this.fancyBookData = resp.data;
    }, err => {
      if (err.status == 401) {
        //this.toastr.error("Error Occured");
      }
      else {
        this.toastr.error("Errors Occured");
      }
    })
  }

  getFancyExposure() {
    this.fancyExpoSubscription = this.dfService.fancyExposureSource.subscribe((data) => {
      console.log(data);
      if (data != null) {
        this.fancyExposures = data;
      }
    })
  }

  marketsNewExposure(bet: any) {
    _.forEach(this.favouriteEvents, (match:any, matchIndex: any) => {
      _.forEach(match.markets, (market: any, mktIndex: any) => {
        if (bet) {
          let newMktExposure = _.cloneDeep((market.pnl));
          if (bet.stake != null && market.id == bet.mktId && bet.mtype == 'market') {
            _.forEach(newMktExposure, (runner:any) => {
              if (bet.backlay == "back" && bet.runnerName == runner.Key) {
                if (bet.profit != null) {
                  runner.Value = this.convertToFloat(parseFloat(runner.Value) + parseFloat(bet.profit));
                }
              }
              if (bet.backlay == "back" && bet.runnerName != runner.Key) {
                runner.Value = this.convertToFloat(parseFloat(runner.Value) - parseFloat(bet.loss));
              }
              if (bet.backlay == "lay" && bet.runnerName == runner.Key) {
                if (bet.profit != null && (bet.rate == null && bet.odds != null)) {
                  runner.Value = this.convertToFloat(parseFloat(runner.Value) - parseFloat(bet.loss));
                }
              }
              if (bet.backlay == "lay" && bet.runnerName != runner.Key) {
                if (bet.profit != null && (bet.rate == null && bet.odds != null)) {
                  runner.Value = this.convertToFloat(parseFloat(runner.Value) + parseFloat(bet.profit));
                }
              }
            })

            market['newpnl'] = newMktExposure;
          }
        }
        else {
          market['newpnl'] = null;
        }

      })
      _.forEach(match.bookRates, (book:any) => {
        if (bet) {
          let newbookExposure = _.cloneDeep((book.pnl));
          if (bet.stake != null && book.id == bet.bookId && bet.mtype == 'book') {
            _.forEach(newbookExposure, (runner:any) => {
              if (bet.backlay == "back" && bet.runnerName == runner.Key) {
                if (bet.profit != null) {
                  runner.Value = this.convertToFloat(parseFloat(runner.Value) + parseFloat(bet.profit));
                }
              }
              if (bet.backlay == "back" && bet.runnerName != runner.Key) {
                runner.Value = this.convertToFloat(parseFloat(runner.Value) - parseFloat(bet.loss));
              }
              if (bet.backlay == "lay" && bet.runnerName == runner.Key) {
                if (bet.profit != null && (bet.rate == null && bet.odds != null)) {
                  runner.Value = this.convertToFloat(parseFloat(runner.Value) - parseFloat(bet.loss));
                }
              }
              if (bet.backlay == "lay" && bet.runnerName != runner.Key) {
                if (bet.profit != null && (bet.rate == null && bet.odds != null)) {
                  runner.Value = this.convertToFloat(parseFloat(runner.Value) + parseFloat(bet.profit));
                }
              }
            })

            book['newpnl'] = newbookExposure;
          }
        }
        else {
          book['newpnl'] = null;
        }
      })

    })
  }

  convertToFloat(value:any) {
    return parseFloat(value).toFixed(2);
  }

  getPnlValue(runner:any,Pnl:any) {
    // console.log(runner,Pnl)
    if (runner.runnerName == undefined) {
      runner['runnerName'] = runner.name;
    }
    let pnl = "";
    if (Pnl) {
      _.forEach(Pnl, (value: { Key: any; Value: string; }, index: any) => {
        if (runner.runnerName == value.Key) {
          pnl = value.Value;
        }
      })
    }
    return pnl;
  }

  getPnlClass(runner:any,Pnl:any) {
    if (runner.runnerName == undefined) {
      runner['runnerName'] = runner.name;
    }
    let pnlClass = "black";
    if (Pnl) {
      _.forEach(Pnl, (value:any, index: any) => {
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

  trackByEvent(index: any, item: any) {
    return item.bfId;
  }

  trackByMkt(index: any, item:any) {
    return item.bfId;
  }
  trackBybookId(index: any, item:any) {
    return item.id;
  }
  trackByRunner(index: any, item:any) {
    return item.runnerName;
  }
  trackByBookRunner(index: any, item: any) {
    return item.name;
  }
  trackByFancy(index: any, item:any) {
    return item.id;
  }

  toggleFavourite(event:any) {
    // _.forEach(this.favouriteEvents, (item, matchIndex) => {
    _.forEach(event.markets, (item2:any) => {
      this.mktService.UnsuscribeSingleMarket(item2.bfId);
    });
    this.fancyService.UnsuscribeSingleFancy(event.id);
    // this.favouriteEvents.splice(matchIndex, 1);
    // });

    this.dfService.ToggleFavourite(event.bfId, true);
  }


  //OPEN BET SLIP CALC


  addStake(stake: number) {
    if (!this.OpenBetForm.value.stake) {
      this.OpenBetForm.controls['stake'].setValue(stake.toFixed(0));
    }
    else if (this.OpenBetForm.value.stake) {
      this.OpenBetForm.controls['stake'].setValue((parseFloat(this.OpenBetForm.value.stake) + stake).toFixed(0))
    }

    this.calcProfit();
  }

  clearStake() {
    this.OpenBetForm.controls['stake'].setValue(null);
    this.calcProfit();
  }
  ClearAllSelection() {
    this.openBet = null;
    this.marketsNewExposure(this.openBet);
  }

  update() {
    this.calcProfit();
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

  incStake() {
    if (!this.OpenBetForm.value.stake) {
      this.OpenBetForm.controls['stake'].setValue(0);
    }

    if (this.OpenBetForm.value.stake > -1) {
      let stake = parseInt(this.OpenBetForm.value.stake);
      this.OpenBetForm.controls['stake'].setValue(stake + this.stakeDiffCalc(stake));
      this.calcProfit();
    }
  }

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
    // console.log(this.OpenBetForm.value)
    if (this.OpenBetForm.value.stake &&
      this.OpenBetForm.value.odds &&
      this.OpenBetForm.value.mtype == 'market') {
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

    if (this.OpenBetForm.value.stake &&
      this.OpenBetForm.value.odds &&
      this.OpenBetForm.value.mtype == 'book') {

      if (this.OpenBetForm.value.bookType == 1) {
        if (this.OpenBetForm.value.backlay == "back") {
          this.OpenBetForm.controls['profit'].setValue(((parseFloat(this.OpenBetForm.value.odds) * this.OpenBetForm.value.stake) / 100).toFixed(2));
          this.OpenBetForm.controls['loss'].setValue(this.OpenBetForm.value.stake);
        } else {
          this.OpenBetForm.controls['loss'].setValue(((parseFloat(this.OpenBetForm.value.odds) * this.OpenBetForm.value.stake) / 100).toFixed(2));
          this.OpenBetForm.controls['profit'].setValue(this.OpenBetForm.value.stake);
        }
      }

      if (this.OpenBetForm.value.bookType == 2) {
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
    }

    if (this.OpenBetForm.value.rate && this.OpenBetForm.value.score && this.OpenBetForm.value.mtype == 'fancy') {
      if (this.OpenBetForm.value.backlay == "back") {
        this.OpenBetForm.controls['profit'].setValue((parseFloat(this.OpenBetForm.value.rate) * this.OpenBetForm.value.stake) / 100);
        this.OpenBetForm.controls['loss'].setValue(this.OpenBetForm.value.stake);
      } else {
        this.OpenBetForm.controls['loss'].setValue((parseFloat(this.OpenBetForm.value.rate) * this.OpenBetForm.value.stake) / 100);
        this.OpenBetForm.controls['profit'].setValue(this.OpenBetForm.value.stake);
      }
    }
    if (this.OpenBetForm.value.stake == null) {
      this.OpenBetForm.controls['profit'].setValue(0);
    }
    this.marketsNewExposure(this.OpenBetForm.value)
  }

  oddsDecimal(value:any) {
    return (value == null || value == '' || (parseFloat(value) > 19.5)) ? value : ((parseFloat(value) > 9.5) ? parseFloat(value).toFixed(1) : parseFloat(value).toFixed(2));
  }

  oddsDiffCalc(currentOdds: number) {
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

  stakeDiffCalc(currentStake: number) {
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

  //CLOSE BET SLIP CALC

  getDataByType(betType: number) {
    this.betType = betType;
  }
  getMatchedUnmatchBets(matchId: any) {
    let betMatchId = matchId;
    // betMatchId = 823;
    if (this.eventBetsSubscription) {
      this.eventBetsSubscription.unsubscribe();
    }
    let allbets;
    this.eventBetsSubscription = this.dfService.allMatchUnmatchBetsSource.subscribe((data: { _userMatchedBets: { [x: string]: any; }; _userUnMatchedBets: { [x: string]: any; }; } | null) => {
      // console.log(betMatchId, data);

      if (data != null) {
        if (this.betType == 4) {
          allbets = this.dfService.matchUnmatchBetsFormat(data._userMatchedBets[betMatchId]);
          this.eventBets = allbets.matchWiseBets;
          this.totalBets = allbets.totalBets;
        }
        else {
          allbets = this.dfService.matchUnmatchBetsFormat(data._userUnMatchedBets[betMatchId]);
          this.eventBets = allbets.matchWiseBets;
          this.totalBets = allbets.totalBets;
        }

        // console.log(this.eventBets)
      }
    })
  }

  trackByBet(bet: { id: any; }) {
    return bet.id;
  }




}

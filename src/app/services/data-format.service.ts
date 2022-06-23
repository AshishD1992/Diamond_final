import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { customDateFormat } from '../helpers/custom-date-format';
// import { checkBettingEnable } from '../helpers/check-betting-enabled';
import * as _ from 'lodash';
let UserSettingData:any;
@Injectable({
  providedIn: 'root',
})
export class DataFormatService {


  private _currentNavigationSub = new BehaviorSubject<any>(null);
  navigation$ = this._currentNavigationSub.asObservable();

  private _currentMenusSub = new BehaviorSubject<any>(null);
  menus$ = this._currentMenusSub.asObservable();

  private _currentDateTimeSub = new BehaviorSubject<any>(null);
  currentDateTimeSource = this._currentDateTimeSub.asObservable();

  private _currentFundsSub = new BehaviorSubject<any>(null);
  funds$ = this._currentFundsSub.asObservable();

  private _currentBetStakeSub = new BehaviorSubject<any>(null);
  betStake$ = this._currentBetStakeSub.asObservable();

  private _currentNewsSub = new BehaviorSubject<any>(null);
  news$ = this._currentNewsSub.asObservable();

  private _currentUserDescriptionSub = new BehaviorSubject<any>(null);
  userDescription$ = this._currentUserDescriptionSub.asObservable();

  fancyExposureSource: Observable<any>;
  private currentFancyExposure: BehaviorSubject<any>;

  allMatchUnmatchBetsSource: Observable<any>;
  private currentAllMatchUnmatchBets: BehaviorSubject<any>

  constructor() {

    this.currentFancyExposure = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fancyExposureSource = this.currentFancyExposure.asObservable();

    this.currentAllMatchUnmatchBets = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.allMatchUnmatchBetsSource = this.currentAllMatchUnmatchBets.asObservable();
   }

  shareNavigationData(data: any) {
    // this.currentNavigation.next()
    this._currentNavigationSub.next(data);
  }

  shareMenusData(data: any) {
    this._currentMenusSub.next(data);
  }

  shareDateTime(date: Date) {
    this._currentDateTimeSub.next(date);
  }

  shareFunds(data: any) {
    this._currentFundsSub.next(data);
  }

  shareNews(data: any) {
    this._currentNewsSub.next(data);
  }

  shareBetStake(data: any) {
    this._currentBetStakeSub.next(data);
  }

  shareUserDescription(data: any) {
    this._currentUserDescriptionSub.next(data);
  }

  NavigationFormat(sportsData:any, curTime:any) {
    // console.log(sportsData)

    let indexTennis = sportsData.findIndex((sport:any) => {
      return sport.name == "Tennis";
    }
    );
    if (indexTennis == -1) {
      var data:any = {};
      data['bfId'] = '2';
      data['name'] = 'Tennis';
      data['id'] = '2';
      data['tournaments'] = [];
      sportsData.push(data);
    }
    let indexCricket = sportsData.findIndex((sport:any) => {
      return sport.name == "Cricket";
    }
    );
    if (indexCricket == -1) {
      var data:any = {};
      data['bfId'] = '4';
      data['name'] = 'Cricket';
      data['id'] = '1';
      data['tournaments'] = [];
      sportsData.push(data);
    }
    let indexSoccer = sportsData.findIndex((sport:any) => {
      return sport.name == "Soccer";
    }
    );
    if (indexSoccer == -1) {
      var data:any = {};
      data['bfId'] = '1';
      data['name'] = 'Soccer';
      data['id'] = '3';
      data['tournaments'] = [];
      sportsData.push(data);
    }

    var sportDataFormat:any = {};
    sportsData.forEach(function (item:any, index:any) {
      if (item.bfId == 4) {
        item['sortId'] = 1;
      }
      if (item.bfId == 2) {
        item['sortId'] = 2;
      }
      if (item.bfId == 1) {
        item['sortId'] = 3;
      }
      if (item.bfId == 51) {
        item['sortId'] = 4;
      }
      var tourDataFormat:any = {};
      item.tournaments.forEach(function (item2:any, index2:any) {
        var matchesDataFormat:any = {};
        item2.matches.forEach(function (item3:any, index3:any) {
          // console.log(item3)
          // var marketsDataFormat = {};

          let isVirtual = false;

          item3.markets.forEach(function (item4:any, index4:any) {
            var runnerarray:any = [];

            if (item4.bfId.indexOf('.') == -1) {
              isVirtual = true;
            }
            _.forEach(item4.runnerData1, function (runner, key) {
              if (runner.Key != undefined) {
                runnerarray.push(runner.Value);
              } else {
                runnerarray.push(runner);
              }
            });
            item4.status = item4.status.trim();
            item4['runners'] = runnerarray;
            // marketsDataFormat[item4.id] = item4;
          });
          item3['sportId'] = item.bfId;
          item3['sportName'] = item.name;
          item3['tourId'] = item2.bfId;
          item3['isInplay'] = item3.inPlay == 1 ? true : false;

          item3['isVirtual'] = isVirtual;


          if (item.bfId == 51) {
            item['isTeenpatti'] = true;
            item3['isTeenpatti'] = true;
            // let tpGame = getTpType(item3.bfId);
            // item3['gameName'] = tpGame.gameName;
            // item3['gameType'] = tpGame.gameType;
          } else {
            item['isTeenpatti'] = false;
            item3['isTeenpatti'] = false;
          }

          if (!item3.bookRates) {
            item3['bookRates'] = [];
            item3['hasBook'] = 0;
          }
          if (item3.hasBook == 1) {
            item3['isBook'] = true;
          } else {
            item3['isBook'] = false;
          }
          if (!item3.fancyData) {
            item3['fancyData'] = [];
            item3['hasFancy'] = 0;
          }

          if (item3.hasFancy == 1) {
            item3['isFancy'] = true;
          } else {
            item3['isFancy'] = false;
          }

          let videoEnabled = false;
          if (item3.tvConfig != null) {
            if (item3.tvConfig.channelIp != null) {
              videoEnabled = true;
            }
          }

          item3['videoEnabled'] = videoEnabled;

          item3['matchDate'] = customDateFormat(item3.startDate);
          // item3['isBettable'] = checkBettingEnable(curTime, item3);

          if (UserSettingData) {
            if (UserSettingData[item3.sportId]) {
              item3['settings'] = UserSettingData[item3.sportId];
              item3['bmSettings'] = UserSettingData[1003];
            }
          }

          if (item3.bmSettings) {
            _.forEach(item3.bookRates, (bookItem) => {
              bookItem.minStake = item3.bmSettings.minStake;
              bookItem.maxStake = item3.bmSettings.maxStake;
              bookItem['maxProfit'] = item3.bmSettings.maxProfit;
            })
          }


          matchesDataFormat[item3.bfId] = item3;
        });
        tourDataFormat[item2.bfId] = {
          bfId: item2.bfId,
          id: item2.id,
          name: item2.name,
          matches: matchesDataFormat
        };
      });
      sportDataFormat[item.bfId] = {
        bfId: item.bfId,
        id: item.id,
        name: item.name,
        sortId: item.sortId,
        isTeenpatti: item.isTeenpatti,
        tournaments: tourDataFormat
      };
    });


    // console.log(sportDataFormat)

    return sportDataFormat;
  }


  sportEventWise(sportsData:any, isInplay:any) {

    var sportEventData:any = [];
    if (sportsData == undefined) {
      return sportEventData;
    }
    _.forEach(sportsData, function (item, index) {
      var data:any = [];
      var matchesData:any = [];
      _.forEach(item.tournaments, function (item2, index2) {
        _.forEach(item2.matches, function (item3, index3) {

          _.forEach(item3.markets, function (item4, index4) {
            if (item4.name == "Match Odds") {
              item4.runnerData['bfId'] = item4.bfId;
              item4.runnerData['inPlay'] = item3.inPlay;
              item4.runnerData['isVirtual'] = item3.isVirtual;
              item4.runnerData['isTeenpatti'] = item3.isTeenpatti;
              item4.runnerData['gameName'] = item3.gameName;
              item4.runnerData['gameType'] = item3.gameType;
              item4.runnerData['dataMode'] = item3.dataMode;
              item4.runnerData['isBettingAllow'] = item4.isBettingAllow;
              item4.runnerData['isMulti'] = item4.isMulti;
              item4.runnerData['marketId'] = item4.id;
              item4.runnerData['startDate'] = item3.startDate;
              item4.runnerData['matchDate'] = item3.matchDate;
              item4.runnerData['videoEnabled'] = item3.videoEnabled;
              item4.runnerData['isBettable'] = item3.isBettable;
              item4.runnerData['isFancy'] = item3.isFancy;
              item4.runnerData['matchId'] = item3.id;
              item4.runnerData['matchName'] = item3.name;
              item4.runnerData['sportName'] = item.name;
              item4.runnerData['sportId'] = item.bfId;
              item4.runnerData['status'] = item3.status;
              item4.runnerData['tourId'] = item2.bfId;
              item4.runnerData['mtBfId'] = item3.bfId;
              item4.runnerData['sportID'] = item.bfId;
              item4.runnerData['sptId'] = item.bfId;
              item4.runnerData['isBook'] = item3.bookRates.length;
              if (isInplay == 1 && item3.isInplay) {
                matchesData.push(item4.runnerData);
              }
              if (isInplay == 0) {
                matchesData.push(item4.runnerData);
              }

            }
          })
        })
      })
      data["id"] = item.bfId;
      data["name"] = item.name;
      data["ids"] = item.id;
      data['sortId'] = item.sortId;
      data['isTeenpatti'] = item.isTeenpatti;
      data["matches"] = matchesData;
      if (matchesData.length > 0 && isInplay == 1) {
        sportEventData.push(data);
      } else {
        sportEventData.push(data);
      }
    })

    sportEventData.sort(function (a:any, b:any) {
      return a.sortId - b.sortId;
    });

    // console.log(sportEventData)

    return sportEventData;
  }

  searchMatchWise(sportsData: any) {
    var matchesData: any[] = []
    if (sportsData == undefined) {
      return matchesData;
    }
    _.forEach(sportsData, function (item, index) {
      _.forEach(item.tournaments, function (item2, index2) {
        _.forEach(item2.matches, function (item3, index3) {
          _.forEach(item3.markets, function (item4, index4) {
            if (item4.name == "Match Odds") {
              item4.runnerData['bfId'] = item4.bfId;
              item4.runnerData['inPlay'] = item3.inPlay;
              item4.runnerData['dataMode'] = item3.dataMode;
              item4.runnerData['isBettingAllow'] = item4.isBettingAllow;
              item4.runnerData['isMulti'] = item4.isMulti;
              item4.runnerData['marketId'] = item4.id;
              item4.runnerData['matchDate'] = item3.startDate;
              item4.runnerData['matchId'] = item3.id;
              item4.runnerData['matchName'] = item3.name;
              item4.runnerData['sportName'] = item.name;
              item4.runnerData['sportId'] = item.id;
              item4.runnerData['sportBfId'] = item.bfId;

              item4.runnerData['status'] = item3.status;
              item4.runnerData['tourId'] = item2.id;
              item4.runnerData['tourBfId'] = item2.bfId;

              item4.runnerData['matchBfId'] = item3.bfId;
              item4.runnerData['sportID'] = item.bfId;
              matchesData.push(item4.runnerData);
            }
          })
        })
      })
    })
    return matchesData;
  }

  ToggleFavourite(mtBfId:any, remove:any) {
    let favourite = this.GetFavourites();;

    if (favourite == null) {
      let matchArray = [];
      matchArray.push(mtBfId)
      this.SetFavourites(matchArray);
    }
    else {
      let matchArray = JSON.parse(favourite);
      let matchIndex = _.indexOf(matchArray, mtBfId);
      if (matchIndex < 0) {
        matchArray.push(mtBfId)
        this.SetFavourites(matchArray);
      }
      else if (matchIndex > -1 && remove) {
        matchArray.splice(matchIndex, 1)
        this.SetFavourites(matchArray);
      }
    }
  }

  SetFavourites(matchArray:any) {
    localStorage.setItem('favourite', JSON.stringify(matchArray));
  }

  GetFavourites() {
    return localStorage.getItem('favourite');
  }

  favouriteEventWise(sportsData:any) {
    let groupedEvents:any = []
    let favArray = localStorage.getItem('favourite');
    if (favArray != null) {
      favArray = JSON.parse(favArray);
      _.forEach(sportsData, function (item, index) {
        _.forEach(item.tournaments, function (item2, index2) {
          _.forEach(item2.matches, function (item3, index3) {
            // item3.markets.forEach(function (item4, index4) {
            //   var runnerarray = [];
            //   _.forEach(item4.runnerData1, function (runner, key) {
            //     if (runner.Key != undefined) {
            //       runnerarray.push(runner.Value);
            //     } else {
            //       runnerarray.push(runner);
            //     }
            //   });
            //   // delete item4.runnerData;
            //   item4['runners'] = runnerarray;
            // });
            let matchIndex = _.indexOf(favArray, item3.bfId);
            if (matchIndex > -1) {
              groupedEvents.push(item3);
            }
          })
        })
      })
    }

    return groupedEvents;
  }

  matchUnmatchBetsFormat(matchBets:any) {
    // console.log(matchBets)
    let matchWiseData = {
      matchWiseBets: [],
      totalBets: 0
    }
    if (!matchBets) {
      return matchWiseData;
    }
    _.forEach(matchBets, (bet, betIndex) => {

      if (bet.backLay == 'YES') {
        bet.backLay = 'BACK';
      }
      if (bet.backLay == 'NO') {
        bet.backLay = 'LAY';
      }
      matchWiseData.totalBets++;
      if (bet.isFancy == 0) {
        bet['profit'] = (parseFloat(bet.odds) - 1) * bet.stake;
        bet['odds'] = parseFloat(bet.odds).toFixed(2);
      }
      if (bet.isFancy == 1) {

        if (bet.odds.indexOf('/') > -1) {
          bet['profit'] = (parseFloat(bet.odds.split('/')[1]) * bet.stake) / 100;
          // bet['odds'] = (bet.score) + '/' + (bet.odds);
        }
      }
      // console.log(bet.marketName)
      if (bet.isFancy == 2) {
        if (bet.marketName == "TO WIN THE TOSS") {
          bet['profit'] = (parseFloat(bet.odds) - 1) * bet.stake;
        }
        else {
          bet['profit'] = (parseFloat(bet.odds) / 100) * bet.stake;
        }
      }
      if (bet.gameType == 1) {
        bet['profit'] = (parseFloat(bet.odds) - 1) * bet.stake;
        bet['odds'] = parseFloat(bet.odds).toFixed(2);
      }
      if (bet.gameType == 2) {
        bet['profit'] = (parseFloat(bet.odds) - 1) * bet.stake;
        bet['odds'] = parseFloat(bet.odds).toFixed(2);
      }
      // matchWiseData.matchWiseBets.push(bet);

    });

    // console.log(matchWiseData)

    return matchWiseData;

  }


}

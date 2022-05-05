import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AaccountStatementComponent } from './aaccount-statement/aaccount-statement.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { UnsettledBetComponent } from './unsettled-bet/unsettled-bet.component';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared.module';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component:  ReportsComponent,
    pathMatch: 'prefix',
    children: [
    {path:'account-statement', component:AaccountStatementComponent,},
     {path:'profit-loss', component:ProfitLossComponent,},
     {path:'bet-history', component:BetHistoryComponent,},
     {path:'unsettled-bet', component:UnsettledBetComponent,},
    ]
  }]
@NgModule({
    declarations: [
    AaccountStatementComponent,
    ProfitLossComponent,
    BetHistoryComponent,
    UnsettledBetComponent,
    ReportsComponent
  ],
    imports: [
      
        CommonModule,
        RouterModule.forChild(routes),
        BsDatepickerModule.forRoot(),
        SharedModule,
     
      ],
      exports: [RouterModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    export class ReportsModule { }
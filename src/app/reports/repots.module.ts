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
import { FormsModule } from '@angular/forms'; 
import { DataTablesModule } from 'angular-datatables';
import { ReversePipe } from '../pipes/reverse.pipe';


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
    ReportsComponent,
    ReversePipe
    
  ],
    imports: [
      
        CommonModule,
        RouterModule.forChild(routes),
        BsDatepickerModule.forRoot(),
        SharedModule,
        FormsModule,
        DataTablesModule
     
      ],
      exports: [RouterModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    export class ReportsModule { }
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeenpattiComponent } from './teenpatti/teenpatti.component';

import { UpdownComponent } from './updown/updown.component';



import { OnedayComponent } from './oneday/oneday.component';

import { T20Component } from './t20/t20.component';






import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { BetSlipCasinoComponent } from './bet-slip-casino/bet-slip-casino.component';
import { MyBetCasinoComponent } from './my-bet-casino/my-bet-casino.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared.module';

import {ExchangesComponent } from './exchanges.component';
  
const routes: Routes = [
  {
    path: '',
    component:  ExchangesComponent,
    pathMatch: 'prefix',
    children: [
  {path:'teenpatti', component: TeenpattiComponent,},
 
  {path:'updown', component:  UpdownComponent,},
 

 

  {path:'oneday', component: OnedayComponent ,},
 
  {path:'t20', component: T20Component ,},
   {path:'t20', component: T20Component ,},
  
 
  

 
  
   
  
  //  {path:'my-bet-casino', component: MyBetCasinoComponent,},
    ]
  }]

@NgModule({
  declarations: [
    TeenpattiComponent,

    UpdownComponent,
  


   
    OnedayComponent,
  
    T20Component,
    

    BetSlipCasinoComponent,
    MyBetCasinoComponent,
    ModalComponent,
 
    ExchangesComponent
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccordionModule.forRoot(),
    ModalModule,
    SharedModule
  ],
  providers: [BsModalService],
  bootstrap: [],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ExchangeGameModule { }

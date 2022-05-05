import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeenpattiComponent } from './teenpatti/teenpatti.component';
import { RouletteComponent } from './roulette/roulette.component';
import { UpdownComponent } from './updown/updown.component';
import { CardComponent } from './card/card.component';
import { PokerComponent } from './poker/poker.component';
import { SicboComponent } from './sicbo/sicbo.component';
import { AnderbaharComponent } from './anderbahar/anderbahar.component';
import { OnedayComponent } from './oneday/oneday.component';
import { MuflisComponent } from './muflis/muflis.component';
import { T20Component } from './t20/t20.component';
import { CasinometerComponent } from './casinometer/casinometer.component';
import { AmarAkbarComponent } from "./amar-akbar/AmarAkbarComponent";
import { TeenVirtualComponent } from './teen-virtual/teen-virtual.component';
import { T20VirtuallComponent } from './t20-virtuall/t20-virtuall.component';
import { UpDownVirtualComponent } from './up-down-virtual/up-down-virtual.component';
import { CardVirtualComponent } from './card-virtual/card-virtual.component';
import { AnderBaharVirtualComponent } from './ander-bahar-virtual/ander-bahar-virtual.component';
import { RouletteVirtualComponent } from './roulette-virtual/roulette-virtual.component';
import { TigerVirtualComponent } from './tiger-virtual/tiger-virtual.component';
import { PokerVirtualComponent } from './poker-virtual/poker-virtual.component';
import { AmarAkbarVirtualComponent } from './amar-akbar-virtual/amar-akbar-virtual.component';
import { SixPokerVirtualComponent } from './six-poker-virtual/six-poker-virtual.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { BetSlipCasinoComponent } from './bet-slip-casino/bet-slip-casino.component';
import { MyBetCasinoComponent } from './my-bet-casino/my-bet-casino.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared.module';
import { VideoComponent } from './video/video.component';
import {ExchangesComponent } from './exchanges.component';
  
const routes: Routes = [
  {
    path: '',
    component:  ExchangesComponent,
    pathMatch: 'prefix',
    children: [
  {path:'teenpatti', component: TeenpattiComponent,},
  {path:'roulette', component: RouletteComponent,},
  {path:'updown', component:  UpdownComponent,},
  {path:'card', component:  CardComponent,},
  {path:'poker', component: PokerComponent,},
  {path:'sicbo', component: SicboComponent,},
  {path:'anderbahar', component: AnderbaharComponent ,},
  {path:'oneday', component: OnedayComponent ,},
  {path:'muflis', component: MuflisComponent ,},
  {path:'t20', component: T20Component ,},
   {path:'t20', component: T20Component ,},
   {path:'meter', component: CasinometerComponent ,},
   {path:'amar-akbar', component: AmarAkbarComponent ,},
   {path:'teen-virtual', component:  TeenVirtualComponent ,},
   {path:'t20-virtual', component: T20VirtuallComponent ,},
   {path:'up-virtual', component: UpDownVirtualComponent ,},
   {path:'card-virtual', component: CardVirtualComponent,},
   {path:'ander-virtual', component:  AnderBaharVirtualComponent,},

   {path:'roulette-virtual', component:   RouletteVirtualComponent,},
   {path:'tiger-virtual', component: TigerVirtualComponent,},
   {path:'poker-virtual', component: PokerVirtualComponent,},
   {path:'amar-akbar-virtual', component:  AmarAkbarVirtualComponent,},
   {path:'six-poker-virtual', component:  SixPokerVirtualComponent,},
   {path:'video', component: VideoComponent,},
  //  {path:'my-bet-casino', component: MyBetCasinoComponent,},
    ]
  }]

@NgModule({
  declarations: [
    TeenpattiComponent,
    RouletteComponent,
    UpdownComponent,
    CardComponent,
    PokerComponent,
    SicboComponent,
    AnderbaharComponent,
    OnedayComponent,
    MuflisComponent,
    T20Component,
    CasinometerComponent,
    AmarAkbarComponent,
    TeenVirtualComponent,
    T20VirtuallComponent,
    UpDownVirtualComponent,
    CardVirtualComponent,
    AnderBaharVirtualComponent,
    RouletteVirtualComponent,
    TigerVirtualComponent,
    PokerVirtualComponent,
    AmarAkbarVirtualComponent,
    SixPokerVirtualComponent,
    BetSlipCasinoComponent,
    MyBetCasinoComponent,
    ModalComponent,
    VideoComponent,
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

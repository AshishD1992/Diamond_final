import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { SetButtonValueComponent } from './set-button-value/set-button-value.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CricketComponent } from './sports/cricket/cricket.component';
import { FootballComponent } from './sports/football/football.component';
import { TennisComponent } from './sports/tennis/tennis.component';
import { ElectionComponent } from './sports/election/election.component';

const routes: Routes = [


  {path:'login', component:  LoginComponent,},
  {path:'', component: HomeComponent,},



  {path:'footer', component: FooterComponent,},
  {path:'rules', component:  RulesComponent,},
  {path:'set-button-value', component: SetButtonValueComponent,},
  {path:'change-password', component: ChangePasswordComponent,},
  {path:'change-password', component: ChangePasswordComponent,},
  {path:'cricket', component:  CricketComponent,},
  {path:'football', component:  FootballComponent ,},
  {path:'tennis', component:  TennisComponent,},
  {path:'election ', component:  ElectionComponent ,},
  // {
  //   path: 'sports',
  //   loadChildren: () =>
  //     import('./sports/sports.module').then((m) => m.SportsModule),
  // },
  {
    path: 'sports',
    loadChildren: () =>
      import('./sports/sports.module').then((m) => m.SportsModule ),
  },
  {
    path: 'exchanges',
    loadChildren: () =>
      import('./exchanges/exchanges.module').then((m) => m.ExchangeGameModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/repots.module').then((m) => m.ReportsModule),
  },
  {
    path: 'sport-event',
    loadChildren: () =>
      import('./sport-event/sport-event.module').then((m) => m.SportEventModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

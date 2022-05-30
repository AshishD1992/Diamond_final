import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { FooterComponent } from './footer/footer.component';
// import { SharedModule } from './shared.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { CricketComponent } from './sports/cricket/cricket.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RulesComponent } from './rules/rules.component';
import { SetButtonValueComponent } from './set-button-value/set-button-value.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
// import { SportEventComponent } from './sport-event/sport-event.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { FootballComponent } from './sports/football/football.component';
import { TennisComponent } from './sports/tennis/tennis.component';
import { ElectionComponent } from './sports/election/election.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    FooterComponent,

    HomeComponent,
          // ReportsComponent,
          RulesComponent,
          SetButtonValueComponent,
          ChangePasswordComponent,
          // SportEventComponent,
          SidenavComponent,
          HeaderComponent,
          NavbarComponent,
          CricketComponent,
          FootballComponent,
          TennisComponent,
          ElectionComponent ,
          
          


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,    
    // SharedModule,
    TabsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      tapToDismiss: true
    }),
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    
  ],


  providers: [
    CookieService,
    LoginService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

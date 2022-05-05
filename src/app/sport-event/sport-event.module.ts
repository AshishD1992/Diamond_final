import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FullmarketComponent } from './fullmarket/fullmarket.component';
import { SharedModule } from '../shared.module';
import { SportEventComponent } from './sport-event.component';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
const routes: Routes = [

  {
    path: '',
    component:SportEventComponent,
    pathMatch: 'prefix',
    children: [

    // {path:'', component: HomeComponent,},
   
    {path:'fullmarket', component: FullmarketComponent,},
    ]
    
  }]
  @NgModule({
    declarations: [
      SportEventComponent,
    
    FullmarketComponent
  ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule,
      TabsModule
    ],
    exports: [RouterModule],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [TabsetConfig],
    bootstrap: []
  })
  export class SportEventModule { }
  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BanklistingComponent } from './banklisting/banklisting.component';
import {BankServiceService} from './bank-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { FavComponent } from './banklisting/fav/fav.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    BanklistingComponent,
    FavComponent
  ],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    NgxSpinnerModule,
    NgSelectModule, FormsModule,  
    
  ],
  providers: [BankServiceService],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }

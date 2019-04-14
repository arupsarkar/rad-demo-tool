import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterial } from './app.material';
import { LeadsComponent } from './leads/leads.component';
import { HomeComponent } from './home/home.component';
import {MatListModule, MatTableModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LeadsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterial,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatListModule
  ],
  exports: [
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

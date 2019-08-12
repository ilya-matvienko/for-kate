import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompanyModule } from './company/company.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CompanyModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

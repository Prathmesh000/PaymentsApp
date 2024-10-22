import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankPageComponent } from './components/bank-page/bank-page.component';
import { BankCorporateDetailsComponent } from './components/bank-corporate-details/bank-corporate-details.component';
import { BankDetailComponent } from './components/bank-detail/bank-detail.component';


@NgModule({
  declarations: [
    BankPageComponent,
    BankCorporateDetailsComponent,
    BankDetailComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule
  ]
})
export class BankModule { }

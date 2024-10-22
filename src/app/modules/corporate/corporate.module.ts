import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateRoutingModule } from './corporate-routing.module';
import { CorporatePageComponent } from './components/corporate-page/corporate-page.component';
import { DisburseSalaryComponent } from './components/disburse-salary/disburse-salary.component';
import { CorporateDetailsComponent } from './components/corporate-details/corporate-details.component';
import { CorporateEmployeesComponent } from './components/corporate-employees/corporate-employees.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewBeneficiaryComponent } from './components/view-beneficiary/view-beneficiary.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { BenificiaryPaymentPageComponent } from './components/benificiary-payment-page/benificiary-payment-page.component';




@NgModule({
  declarations: [
    CorporatePageComponent,
    DisburseSalaryComponent,
    CorporateDetailsComponent,
    CorporateEmployeesComponent,
    ViewBeneficiaryComponent,
    AddBeneficiaryComponent,
    BenificiaryPaymentPageComponent
  ],
  imports: [
    CommonModule,
    CorporateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class CorporateModule { }

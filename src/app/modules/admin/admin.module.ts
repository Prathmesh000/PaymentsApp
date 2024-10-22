import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { BankRequestsComponent } from './components/bank-requests/bank-requests.component';
import { CorporateRequestComponent } from './components/corporate-request/corporate-request.component';
import { ViewBanksComponent } from './components/view-banks/view-banks.component';
import { ViewCorporateComponent } from './components/view-corporate/view-corporate.component';
import { ViewPaymentrequestsComponent } from './components/view-paymentrequests/view-paymentrequests.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BatchPaymentComponent } from './components/batch-payment/batch-payment.component';
import { BenificiaryRequestComponent } from './components/benificiary-request/benificiary-request.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { UpdateCorporateComponent } from './components/update-corporate/update-corporate.component';


@NgModule({
  declarations: [
    AdminComponent,
    BankRequestsComponent,
    CorporateRequestComponent,
    ViewBanksComponent,
    ViewCorporateComponent,
    ViewPaymentrequestsComponent,
    BatchPaymentComponent,
    BenificiaryRequestComponent,
    EmployeeReportComponent,
    UpdateCorporateComponent,
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    
  ],
})
export class AdminModule { }

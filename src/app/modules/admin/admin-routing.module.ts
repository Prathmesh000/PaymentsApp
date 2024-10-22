import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BankRequestsComponent } from './components/bank-requests/bank-requests.component';
import { ViewPaymentrequestsComponent } from './components/view-paymentrequests/view-paymentrequests.component';
import { ViewCorporateComponent } from './components/view-corporate/view-corporate.component';
import { ViewBanksComponent } from './components/view-banks/view-banks.component';
import { CorporateRequestComponent } from './components/corporate-request/corporate-request.component';
import { BatchPaymentComponent } from './components/batch-payment/batch-payment.component';
import { BenificiaryRequestComponent } from './components/benificiary-request/benificiary-request.component';
import { AuthGuard } from '../../guards/auth.guard';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { UpdateCorporateComponent } from './components/update-corporate/update-corporate.component';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'bankrequest', component: BankRequestsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'corporaterequest', component: CorporateRequestComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'viewbanks', component: ViewBanksComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'viewcorporate', component: ViewCorporateComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'viewpaymentrequests', component: ViewPaymentrequestsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'viewbatchpayment', component: BatchPaymentComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'benificiaryrequest', component: BenificiaryRequestComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] }},
  { path: 'employeereport', component: EmployeeReportComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] } },
  { path: 'updateCorporate/:id', component: UpdateCorporateComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

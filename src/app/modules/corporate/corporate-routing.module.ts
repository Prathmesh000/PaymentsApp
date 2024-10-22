import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporatePageComponent } from './components/corporate-page/corporate-page.component';
import { DisburseSalaryComponent } from './components/disburse-salary/disburse-salary.component';
import { CorporateDetailsComponent } from './components/corporate-details/corporate-details.component';
import { CorporateEmployeesComponent } from './components/corporate-employees/corporate-employees.component';
import { ViewBeneficiaryComponent } from './components/view-beneficiary/view-beneficiary.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { AuthGuard } from '../../guards/auth.guard';
import { BenificiaryPaymentPageComponent } from './components/benificiary-payment-page/benificiary-payment-page.component';

const routes: Routes = [
  { path: ':id', component: CorporatePageComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']} },
  {path: 'disbursesalary/:id', component: DisburseSalaryComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']}},
  {path: 'corporatedetails/:id', component: CorporateDetailsComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']}},
  {path: 'corporateemployees/:id', component: CorporateEmployeesComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']}},
  {path: 'viewBenificiary/:id', component: ViewBeneficiaryComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']}},
  {path: 'addBenificiary/:id', component: AddBeneficiaryComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']}},
  {path: 'benificiarypayment/:id', component: BenificiaryPaymentPageComponent, canActivate:[AuthGuard], data: { expectedRoles: ['corporate']}}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateRoutingModule { }

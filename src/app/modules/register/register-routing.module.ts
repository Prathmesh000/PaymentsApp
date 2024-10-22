import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { RegisterCompanyComponent } from './component/register-company/register-company.component';
import { RegisterBankComponent } from './component/register-bank/register-bank.component';

const routes: Routes = [
  {path: "", component: RegisterComponent},
  {path: "registercompany", component: RegisterCompanyComponent },
  {path: "registerbank", component: RegisterBankComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }

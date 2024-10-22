import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './component/register/register.component';

import { RegisterBankComponent } from './component/register-bank/register-bank.component';
import { RegisterCompanyComponent } from './component/register-company/register-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterBankComponent,
    RegisterCompanyComponent,
    
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterModule { }

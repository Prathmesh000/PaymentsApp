import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankPageComponent } from './components/bank-page/bank-page.component';
import { BankDetailComponent } from './components/bank-detail/bank-detail.component';
import { BankCorporateDetailsComponent } from './components/bank-corporate-details/bank-corporate-details.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: ":id", component: BankPageComponent , canActivate:[AuthGuard], data: { expectedRoles: ['bank']}},
  { path: "bankdetails/:id", component: BankDetailComponent, canActivate:[AuthGuard], data: { expectedRoles: ['bank']} },
  { path: "bankcorporate/:id", component: BankCorporateDetailsComponent, canActivate:[AuthGuard], data: { expectedRoles: ['bank']} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }

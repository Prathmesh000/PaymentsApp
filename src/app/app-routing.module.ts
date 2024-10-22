import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  {
    path: 'landing-page',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(l => l.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login-page/login-page.module').then(l => l.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(r => r.RegisterModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
     
  },
  {
    path: 'bank',
    loadChildren: () => import('./modules/bank/bank.module').then(b => b.BankModule),
  
  },
  {
    path: 'corporate',
    loadChildren: () => import('./modules/corporate/corporate.module').then(c => c.CorporateModule),
   
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

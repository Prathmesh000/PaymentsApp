import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private authService : AuthserviceService, private router : Router){}
  
  viewBankRequest(){
  
      this.router.navigate([`/admin/bankrequest`]);
  }

  viewCorporateRequest() {
    this.authService.getUnregisteredCorporate().subscribe(data =>{
      this.router.navigate([`/admin/corporaterequest`]);

    })
  }

  ViewCorporates() {
    this.authService.getBanks().subscribe(data => {
      console.log(data);
      this.router.navigate([`/admin/viewcorporate`]);
      
    })
    }

    viewBanks() {
    this.authService.getCorporates().subscribe(data => {
      console.log(data);
      this.router.navigate([`/admin/viewbanks`]);

    })
    }

    viewPaymentRequests(){
      this.authService.getPaymentRequests().subscribe(data => {
        console.log(data);
      this.router.navigate([`/admin/viewpaymentrequests`]);

        
      })
    }

    viewBatchPayment() {
     this.router.navigate([`/admin/viewbatchpayment`]);
      }
    
      viewBenificiaryRequests() {
        this.router.navigate([`/admin/benificiaryrequest`])
        }
        
        viewreport() {
          this.router.navigate([`/admin/employeereport`])
          }
          
        
      logoutpage() {
        this.authService.logout()
        this.router.navigate([`/login`]);
        }

      
          
}

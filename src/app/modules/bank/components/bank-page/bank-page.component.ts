import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-bank-page',
  templateUrl: './bank-page.component.html',
  styleUrl: './bank-page.component.css'
})
export class BankPageComponent {
 
  bankId!: number;
  bankName !: string;
  bankData!: any;
  constructor(private authService: AuthserviceService, private route: ActivatedRoute, private router: Router) { }
 
  ngOnInit() {
    this.viewBank();
  }
  viewBank() {
    this.bankId = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getBankById(this.bankId).subscribe(
      (response) => {
        console.log(response);
        this.bankData = response
        this.bankName = this.bankData.bankName || 'Bank';
      },
      (error) => {
        console.log("Error Fetching data: ", error);
      }
    );
  }
 
  viewBankDetails() {
    // Navigate to the bank details component
    this.router.navigate([`/bank/bankdetails/${this.bankId}/`]); // Adjust path as necessary
  }
 
  viewCorporates() {
    // Navigate to the corporates component
    this.router.navigate([`/bank/bankcorporate/${this.bankId}`]); // Adjust path as necessary
  }
 
  logoutpage() {
    this.authService.logout()
    this.router.navigate([`/login`]);
  }
}
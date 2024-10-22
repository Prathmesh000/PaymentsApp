import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-bank-corporate-details',
  templateUrl: './bank-corporate-details.component.html',
  styleUrl: './bank-corporate-details.component.css'
})
export class BankCorporateDetailsComponent {
  bankDetails: any;
  bankId!: number;
  bankName!: string;
  expandedCorporateId: number | null = null;
  constructor(private authService: AuthserviceService, private router: Router, private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.viewBank();
  }
 
  viewBank() {
    this.bankId = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getBankById(this.bankId).subscribe(
      (response) => {
        console.log(response);
        this.bankDetails = response;
        this.bankName = this.bankDetails.bankName
      },
      (error) => {
        console.log("Error Fetching data: ", error);
      }
    );
  }
  toggleDetails(corporateId: number) {
    // Toggle the visibility of corporate details
    this.expandedCorporateId = this.expandedCorporateId === corporateId ? null : corporateId;
  }
  logoutpage() {
    this.authService.logout()
    this.router.navigate([`/login`]);
  }
}
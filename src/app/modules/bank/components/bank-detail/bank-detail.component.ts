import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
 
@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrl: './bank-detail.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class BankDetailComponent implements OnInit {
  bankDetails: any;
  bankId!: number;
  bankName!: string;
  isExpanded: boolean = false;
 
  constructor(private authService: AuthserviceService, private router: Router, private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.viewBank();
  }
  expandedCorporateId: string | null = null;
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
 
  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }
  logoutpage() {
    this.authService.logout()
    this.router.navigate([`/login`]);
  }
}
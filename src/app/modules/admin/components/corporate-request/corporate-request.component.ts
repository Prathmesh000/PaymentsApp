import { Component, OnInit } from '@angular/core';
import { AuthserviceService, ICorporate } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corporate-request',
  templateUrl: './corporate-request.component.html',
  styleUrls: ['./corporate-request.component.css'] // Fixing the property name from `styleUrl` to `styleUrls`
})
export class CorporateRequestComponent implements OnInit {
  unregisteredCorporates: any;
  loading: boolean = true; // Loader state variable

  corporate: ICorporate = {
    CorporateId: 0,
    CorporateName: "",
    CorporateEmail: "",
    Password: "",
    CorporateRegNumber: "",
    Balance: 0,
    State: "",
    City: "",
    Role: "",
    IsApproved: false,
    CorporateIFSC: "",
    BankId: 0,
    Bank: {},
    Employees: []
  };

  constructor(private authService: AuthserviceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCorporates(); 
  }

  fetchCorporates() {
    this.loading = true; 
    this.authService.getUnregisteredCorporate().subscribe(
      (response) => {
        this.unregisteredCorporates = response;
        console.log(this.unregisteredCorporates);
      },
      (error) => {
        console.error('Error fetching corporates', error);
      },
      () => {
        this.loading = false; // End loading once request completes
      }
    );
  }

  approveCorporate(id: number) {
    this.loading = true; // Start loading
    this.authService.approveCorporate(id, this.corporate).subscribe(
      (response) => {
        alert("Corporate Approved");
        this.fetchCorporates(); // Refresh the list
      },
      (error) => {
        console.error('Error approving corporate', error);
      },
      () => {
        this.loading = false; // End loading
      }
    );
  }

  rejectCorporate(id: number) {
    this.loading = true; // Start loading
    this.authService.rejectCorporate(id).subscribe(
      (response) => {
        console.log("Deleted Successfully");
        alert("Deleted Successfully, mail has been sent");
        this.fetchCorporates(); // Refresh the list
      },
      (error) => {
        console.error('Error rejecting corporate', error);
      },
      () => {
        this.loading = false; // End loading
      }
    );
  }

  viewDocument(filePath: string) {
    if (filePath) {
      window.open(filePath, '_blank'); // Opens the document in a new tab
    } else {
      alert('Document not available');
    }
  }
}

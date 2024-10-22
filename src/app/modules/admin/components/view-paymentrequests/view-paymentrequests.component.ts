import { Component, OnInit } from '@angular/core';
import { AuthserviceService, IEmployee } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-paymentrequests',
  templateUrl: './view-paymentrequests.component.html',
  styleUrl: './view-paymentrequests.component.css'
})
export class ViewPaymentrequestsComponent implements OnInit {


  employees : any;
  loading : boolean = false;

  constructor(private authService : AuthserviceService, private router : Router){}

  ngOnInit(): void {
    this.loadEmployees()
  }

  loadEmployees(){
    this.loading = true;
    this.authService.getPaymentRequests().subscribe(
      (response) =>{
        this.loading = false
        this.employees = response
        console.log(response);
      },
      (error)=>{
        console.log('Error: ', error);
        this.loading = false
        
      }
    )
  }

  processPayments(employees: IEmployee[]) {
    this.loading = true

    this.authService.approvePayment(employees).subscribe(
      (response) => {
    this.loading = false

        if (response) {
          console.log(response);
          alert("Payments Processed Successfully");
        } else {
          // Handle the case where the backend doesn't send a body but still succeeded
          alert("Payments Processed Successfully");
        }
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log('Error:', error);
        alert("There was an error processing payments.");
    this.loading = false

      }
    );
  }
  
}

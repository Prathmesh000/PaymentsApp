import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch-payment',
  templateUrl: './batch-payment.component.html',
  styleUrl: './batch-payment.component.css'
})
export class BatchPaymentComponent implements OnInit {


  batchpayments : any;

  constructor(private authService : AuthserviceService, private router : Router){}

  ngOnInit(): void {
    this.loadPaymentBatch();
  }

  loadPaymentBatch(){
    this.authService.getbatchpayments().subscribe(
      (response)=>{
        this.batchpayments = response;
        console.log(response);
        
      }, 
      (error)=>{
        console.log('Error', error);
        
      }
    )
  }

  downloadExcelSheet() {
    this.authService.downloadBatchPayment().subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Specify the correct MIME type for Excel files
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'batch_payments.xlsx'; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Clean up
        window.URL.revokeObjectURL(url); // Release memory
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }
  
}

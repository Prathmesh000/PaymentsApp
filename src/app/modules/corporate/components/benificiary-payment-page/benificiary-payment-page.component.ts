import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var paypal : any;
@Component({
  selector: 'app-benificiary-payment-page',
  templateUrl: './benificiary-payment-page.component.html',
  styleUrl: './benificiary-payment-page.component.css'
})
export class BenificiaryPaymentPageComponent implements OnInit, AfterViewInit{

  benefeciary : any;
  id !: number ;

  constructor(private readonly authServices : AuthserviceService, private router:Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.fetchbenificiary();
}

  fetchbenificiary(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.authServices.getBenificiaryById(this.id).subscribe(
      (response)=>{
        this.benefeciary = response;
        console.log(response);
        
      },                  
      (error)=>{
        console.log('Error', error);
        
      }
    )
}

 

ngAfterViewInit(): void {
  this.initPayPalButton();
}

initPayPalButton(): void {
  if (document.getElementById('paypal-button-container')) {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.Amount.toString()  // Convert amount to string for PayPal
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        this.transactionInProgress = true;  // Show transaction progress message
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);

         this.id = Number(this.route.snapshot.paramMap.get('id'));
          this.authServices.benificiaryPayment(this.id,this.Amount).subscribe(
            (response)=>{
              
              alert("Payment Done")
              this.router.navigate([`/corporate/${this.id}`])
              console.log("Seuccess, amount deducted");
              
            },
            (error)=>{
              console.log("Error", error);
              
            }
          )

          
        });
      },
      onCancel: (data: any) => {
        console.log('Transaction was canceled.');
        this.transactionInProgress = false;
      },
      onError: (err: any) => {
        console.error('Error during the transaction', err);
        this.transactionInProgress = false;
      }
    }).render('#paypal-button-container'); // Ensure the element exists before rendering
  } else {
    console.error('PayPal button container not found');
  }
}

Amount!: number;
transactionInProgress: boolean = false;

}

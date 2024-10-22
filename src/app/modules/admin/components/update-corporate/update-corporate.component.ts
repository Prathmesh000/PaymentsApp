import { Component, OnInit } from '@angular/core';
import { AuthserviceService, ICorporate } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-corporate',
  templateUrl: './update-corporate.component.html',
  styleUrl: './update-corporate.component.css'
})
export class UpdateCorporateComponent implements OnInit {

 corporate : ICorporate = {
  CorporateId : 0,
  CorporateName : "",
  CorporateEmail : "",
  CorporateRegNumber : "",
  Password : "",
  Balance : 0,
  State : "",
  City : "",
  Role : "",
  IsApproved : false, 
  CorporateIFSC : "",
  BankId : 0,
  Bank : {},
  Employees : []
 }

 corporateForm !: FormGroup;

 constructor(private formbuilder:FormBuilder, private authServices : AuthserviceService, private router : Router, private route:ActivatedRoute){}

 ngOnInit(): void {
  // Initialize the form with default values and validation
  this.corporateForm = this.formbuilder.group({
    corporateName: ['', [Validators.required, Validators.minLength(3)]],
    corporateEmail: ['', [Validators.required, Validators.email]],
    corporateRegNumber: ['', Validators.required],
    balance: [, [Validators.required, Validators.min(0)]],
    state: ['', Validators.required],
    city: ['', Validators.required]
  });
}
 
onSubmit(): void {
  if (this.corporateForm.valid) {
    // Map form values to corporate object
    this.corporate.CorporateName = this.corporateForm.get('corporateName')?.value;
    this.corporate.CorporateEmail = this.corporateForm.get('corporateEmail')?.value;
    this.corporate.CorporateRegNumber = this.corporateForm.get('corporateRegNumber')?.value;
    this.corporate.Balance = this.corporateForm.get('balance')?.value;
    this.corporate.State = this.corporateForm.get('state')?.value;
    this.corporate.City = this.corporateForm.get('city')?.value;
    
    this.corporate.CorporateId = Number(this.route.snapshot.paramMap.get('id'));

    // Call your service to update the corporate information
    this.authServices.updateCorporate(this.corporate).subscribe({
      next: (response) => {
        alert("Corporate Updated Successfully");
        window.location.reload() // Navigate to another page on success
      },
      error: (err) => {
        console.error('Error updating corporate:', err);
      }
    });
  } else {
    console.log('Form is invalid');
  }
}

}

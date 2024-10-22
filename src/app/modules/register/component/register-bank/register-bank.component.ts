import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';
import { Ibank } from '../../../../service/auth-services.service';
 
@Component({
  selector: 'app-register-bank',
  templateUrl: './register-bank.component.html',
  styleUrl: './register-bank.component.css'
})
export class RegisterBankComponent implements OnInit {
 
  bankForm!: FormGroup;
 
  constructor(private fb: FormBuilder, private authservices: AuthserviceService, private router: Router) { }
 
  ngOnInit(): void {
    this.bankForm = this.fb.group({
      bankName: ['', [Validators.required, Validators.minLength(3)]],
      bankEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bankIFSC: ['', Validators.required],
      bankCity: ['', Validators.required],  // Bank City
      bankState: ['', Validators.required],  // Bank State
      branchName: ['', Validators.required],  // Branch Name
      bankContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Bank Contact (10-digit number validation)
      bankLicenseNumber: ['', Validators.required],  // Bank License Number
      bankManagerName: ['', Validators.required]  // Bank Manager Name
    });
  }
 
  onSubmit(): void {
    if (this.bankForm.valid) {
      console.log('Form Submitted', this.bankForm.value);
 
      const bankData: Ibank = {
        BankId: 0,
        BankName: this.bankForm.value.bankName,
        BankEmail: this.bankForm.value.bankEmail,
        Password: this.bankForm.value.password,
        BankIFSC: this.bankForm.value.bankIFSC,
        BankCity: this.bankForm.value.bankCity,
        BankState: this.bankForm.value.bankState,
        BranchName: this.bankForm.value.branchName,
        BankContact: this.bankForm.value.bankContact,
        BankLicenseNumber: this.bankForm.value.bankLicenseNumber,
        BankManagerName: this.bankForm.value.bankManagerName,
        Role: '', // Default role handling
        IsApproved: false,
        Corporates: []
      };
 
      this.authservices.addBank(bankData).subscribe(
        (response) => {
          console.log('Bank added successfully:', response);
          this.router.navigate(['/login']);
          alert("Bank Details Submitted");
        },
        (error) => {
          console.error('Error adding bank:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
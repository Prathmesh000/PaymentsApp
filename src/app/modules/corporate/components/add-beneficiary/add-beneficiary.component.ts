import { Component, OnInit } from '@angular/core';
import { AuthserviceService, IBeneficiary } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css'] // Corrected this line
})
export class AddBeneficiaryComponent implements OnInit {
  
  beneficiaryForm!: FormGroup;
  
  id !: number;

  beneficiary: IBeneficiary = {
    BeneficiaryId: 0,
    BeneficiaryName: "",
    AccountNumber: 0,
    Status: "",
    BeneficiaryEmail: "",
    CorporateId: 0,
    Balance : 0,
    BenificiaryIFSC : ""
  }

  constructor(private fb: FormBuilder, private authService: AuthserviceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.beneficiaryForm = this.fb.group({
     
      BeneficiaryName: ['', [Validators.required, Validators.minLength(3)]],
      AccountNumber: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      BeneficiaryEmail: ['', [Validators.required, Validators.email]],
      Balance: ['', [Validators.required, Validators.minLength(4)]],
      BeneficiaryIFSC: ['', [Validators.required, Validators.minLength(12)]],
    
    });
  }

  onSubmit(): void {
    if (this.beneficiaryForm.valid) {
      
      this.postBenificiary();
    } else {
      console.log('Form Invalid');
    }
  }

  postBenificiary(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.beneficiary.BeneficiaryName = this.beneficiaryForm.get('BeneficiaryName')?.value;
    this.beneficiary.AccountNumber = this.beneficiaryForm.get('AccountNumber')?.value;
    this.beneficiary.BeneficiaryEmail = this.beneficiaryForm.get('BeneficiaryEmail')?.value;
    this.beneficiary.Balance = this.beneficiaryForm.get('Balance')?.value;
    this.beneficiary.BenificiaryIFSC = this.beneficiaryForm.get('BeneficiaryIFSC')?.value;

    this.authService.addBenificiary(this.beneficiary,this.id).subscribe(
      (response)=>{
        alert("Benificiary Request sent to Admin");
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.router.navigate([`/corporate/${this.id}`])
      },
      (error)=>{
        console.log("Error",error);
        
      }
    )
  }
}

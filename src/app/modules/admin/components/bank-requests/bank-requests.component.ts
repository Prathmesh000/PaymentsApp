import { Component, OnInit } from '@angular/core';
import { AuthserviceService, Ibank } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-bank-requests',
  templateUrl: './bank-requests.component.html',
  styleUrl: './bank-requests.component.css'
})
export class BankRequestsComponent implements OnInit{
 
  unregisteredBanks : any;
  loading : boolean = false
  bank: Ibank = {
   
  BankId : 0,
  BankName : "",
  BankEmail : "",
  Password : "",
  BankIFSC : "",
  Role : "",
  BankCity: '',
  BankState: '',
  BranchName: '',
  BankContact: '',
  BankLicenseNumber: 0,
  BankManagerName: '',
  IsApproved : false,
  Corporates: []
 
  }
  constructor(private authservices:AuthserviceService, private router:Router){}
 
  ngOnInit(): void {
    
    this.fetchBanks();
  }
 
  fetchBanks() {
    this.loading = true
    this.authservices.getUnregisteredBanks().subscribe(
      (response)=>{
        this.unregisteredBanks = response;
        console.log(response);
    this.loading = false

      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }
 
  approveBank(bankid: number) {
    this.loading = true
    this.authservices.approveBank(bankid, this.bank).subscribe(
    (response)=>{
      alert("Bank Approved")
      window.location.reload();
    this.loading = false

    },
    (error) => {
      console.error('Error', error);
    }
    )
  }
  
}
 
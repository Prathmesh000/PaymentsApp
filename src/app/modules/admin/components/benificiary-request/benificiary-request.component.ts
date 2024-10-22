import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-benificiary-request',
  templateUrl: './benificiary-request.component.html',
  styleUrl: './benificiary-request.component.css'
})
export class BenificiaryRequestComponent implements OnInit {

  benificiaryRequest : any[] = [];
 loading : boolean = false;
  constructor(private authService : AuthserviceService, private router : Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(){
    this.loading = true
    this.authService.getBenficiaryRequests().subscribe(
      (response)=>{
        this.benificiaryRequest = response;
        console.log(this.benificiaryRequest);
    this.loading = false

        
      }, 
      (error)=>{
        console.log("Error", error);
        
      }
    )
  }

  approveRequest(id : number){
    this.loading = true
    this.authService.approveBenificiary(id).subscribe(
      (response)=>{
        alert("Benificiary Request Approved");
        window.location.reload();
    this.loading = false

      },
      (error)=>{
        console.log("Error", error);
        
      }
    )
  }

  rejectRequest(id : number){  
    this.authService.rejectBenificiary(id).subscribe(
      (response)=>{
        alert("Benificiary Request Rejected");
        window.location.reload();
      },
      (error)=>{
        console.log("Error", error);
        
      }
    )
  }
}

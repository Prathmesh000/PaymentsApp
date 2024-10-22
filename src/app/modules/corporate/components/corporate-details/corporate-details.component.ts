import { Component, OnInit } from '@angular/core';
import { AuthserviceService, ICorporate } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrl: './corporate-details.component.css'
})
export class CorporateDetailsComponent implements OnInit{

  loading = true;
  corporateDetails !: any
  id !: number
  constructor(private authServices : AuthserviceService, private router : Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.viewEmployee()
  }

  viewEmployee(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.authServices.getCorporatesById(this.id).subscribe(
      (response) =>{
        this.corporateDetails = response
        console.log(response);
        this.loading = false;
        
      },
      (error)=>{
      console.error('Error:', error.message);
      this.loading = false;
      }
    )
  }

}

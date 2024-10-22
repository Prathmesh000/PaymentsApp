import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-beneficiary',
  templateUrl: './view-beneficiary.component.html',
  styleUrl: './view-beneficiary.component.css'
})
export class ViewBeneficiaryComponent implements OnInit {


  benefeciary : any;
  id !: number ;
  constructor(private readonly authServices : AuthserviceService, private router:Router, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.fetchbenificiary();
}

  fetchbenificiary(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.authServices.getBeneficiary(this.id).subscribe(
      (response)=>{
        this.benefeciary = response;
        console.log(response);
        
      },                  
      (error)=>{
        console.log('Error', error);
        
      }
    )
}

    Pay(id : number) {

      this.router.navigate([`corporate/benificiarypayment/${id}`]);
    }

}

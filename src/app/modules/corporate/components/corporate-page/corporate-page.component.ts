import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService, ICorporate } from '../../../../service/auth-services.service';
 
@Component({
  selector: 'app-corporate-page',
  templateUrl: './corporate-page.component.html',
  styleUrl: './corporate-page.component.css'
})
export class CorporatePageComponent {
 
  id !: number;
  corporateDetails !: ICorporate;
  corpName !: string;
  corpData !: any;
  constructor(private authService: AuthserviceService, private router: Router, private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.viewCorp()
  }
 
  viewCorp() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getCorporatesById(this.id).subscribe((response) => {
      console.log(response);
      this.corpData = response;
      this.corpName = this.corpData.corporateName;
      console.log(this.corpName);
    }, (error) => {
      console.log(error);
    })
  }
 
  disburseSalaries() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
 
    this.router.navigate([`/corporate/disbursesalary/${this.id}`]);
  }
 
  viewCorporate() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
 
    this.router.navigate([`/corporate/corporatedetails/${this.id}`]);
 
  }
 
  viewEmployees() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
 
    this.router.navigate([`/corporate/corporateemployees/${this.id}`]);
  }
 
  viewBenficiary() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate([`/corporate/viewBenificiary/${this.id}`])
  }
 
  addBenificiary() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate([`/corporate/addBenificiary/${this.id}`])
  }
 
  logoutpage() {
 
    this.authService.logout()
    this.router.navigate([`/login`]);
  }
 
}
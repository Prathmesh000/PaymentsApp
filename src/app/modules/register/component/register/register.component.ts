import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router : Router){}

registercompany() {
  this.router.navigate([`/register/registercompany`]);
 
}
registerbank() {
  this.router.navigate([`/register/registerbank`]);

}

}

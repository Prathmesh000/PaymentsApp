import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

 
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  // constructor() { }
  email: string = "";
  password: string = "";
 role:string = "";
 recaptchaResponse:string = ""
 isLoading: boolean = false; 
 
  constructor(private authService: AuthserviceService, private router: Router) { }

  onSubmit() {
    this.isLoading = true;
    const loginData = {
      email: this.email,
      password: this.password,
      
    }

    if (!this.recaptchaResponse) {
      alert('Please complete the reCaptcha');
      this.isLoading = false;
      return;
    }

    this.authService.login(loginData).subscribe(
      (response) => {
        console.log("Login Successfull", response);
        const decoded : any = jwtDecode(response);
        this.role = decoded.role;
        const userId = decoded.id;
        console.log(this.role);

    
console.log("Decoded JWT:", decoded);  // Check if `id` exists in the token

        if(this.role === 'corporate') {
          this.router.navigate([`/corporate/${userId}`]);  // Navigate only for corporate role
        } 
        else if(this.role === 'bank'){
          this.router.navigate([`bank/${userId}`])
        }
        else {
          this.router.navigate([`/${this.role}`]); // Navigate for other roles
        }
       
        this.isLoading = false;
      },
      (error) => {
        console.log('Failed', error);
        alert("Invalid Credentials");
        window.location.reload()
        this.isLoading = false;
      }
    );
  }

  onRecaptchaResolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse || '';
  }
}
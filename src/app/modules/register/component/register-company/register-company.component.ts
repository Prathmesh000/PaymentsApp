import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-register-company',
    templateUrl: './register-company.component.html',
    styleUrls: ['./register-company.component.css'] 
})

export class RegisterCompanyComponent implements OnInit {
  corporateForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null; // New property for file error message
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthserviceService, private router: Router) {
    this.corporateForm = this.fb.group({
      corporateName: ['', Validators.required],
      corporateEmail: ['', [Validators.required, Validators.email]],
      corporateRegNumber: ['', Validators.required],
      password: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(10000)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      corporateIFSC: ['', Validators.required],
      document: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']; // Allowed file types
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

      // Validate file type and size
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Invalid file type. Only PDF, JPG, and PNG are allowed.';
        this.selectedFile = null;
      } else if (file.size > maxSize) {
        this.fileError = 'File size exceeds 2 MB limit.';
        this.selectedFile = null;
      } else {
        this.fileError = null; // Clear error if valid
        this.selectedFile = file;
      }
    }
  }

  onSubmit(): void {
    if (this.corporateForm.valid) {
      // Check if a valid file is selected
      if (this.fileError) {
        console.log('File is invalid:', this.fileError);
        return; // Prevent submission if the file is invalid
      }
      this.loading = true;


      const formData = new FormData();
      formData.append('corporateName', this.corporateForm.get('corporateName')?.value);
      formData.append('corporateEmail', this.corporateForm.get('corporateEmail')?.value);
      formData.append('CorporateRegNumber', this.corporateForm.get('corporateRegNumber')?.value);
      formData.append('password', this.corporateForm.get('password')?.value);
      formData.append('balance', this.corporateForm.get('balance')?.value);
      formData.append('state', this.corporateForm.get('state')?.value);
      formData.append('city', this.corporateForm.get('city')?.value);
      formData.append('corporateIFSC', this.corporateForm.get('corporateIFSC')?.value);
      formData.append('bankId', '0');

      if (this.selectedFile) {
        formData.append('uploadFile', this.selectedFile);
      }

      this.authService.addCorporate(formData).subscribe({
        next: (response: any) => {
          console.log('Corporate registered successfully', response);
          alert("Registered Successfully");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error adding corporate', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

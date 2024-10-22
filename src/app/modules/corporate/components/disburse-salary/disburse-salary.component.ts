import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-disburse-salary',
  templateUrl: './disburse-salary.component.html',
  styleUrls: ['./disburse-salary.component.css'] // Fixed the property name
})
export class DisburseSalaryComponent {

  selectedFile: File | null = null; 
  corporateId !: number; 
  fileError: string | null = null; // Variable to hold file validation error messages
  loading : boolean = false;
  
  constructor(private authService: AuthserviceService, private router: Router, private route: ActivatedRoute) {}

  onFileChange(event: any): void {
    const file = event.target.files[0]; 
    this.fileError = null; // Reset file error on new file selection

    if (file) {
      if (file.name.endsWith('.xlsx')) {
        if (file.size <= 5 * 1024 * 1024) { // Check if file size is less than 5 MB
          this.selectedFile = file; 
        } else {
          this.fileError = 'File size must be less than 5 MB.'; // Set error message for file size
          console.error(this.fileError);
          this.selectedFile = null; 
        }
      } else {
        this.fileError = 'Invalid file type. Please select an .xlsx file.'; // Set error message for file type
        console.error(this.fileError);
        this.selectedFile = null; 
      }
    } else {
      this.fileError = 'No file selected.'; // Set error message for no file selected
    }
  }

  onSubmit(): void {
    this.loading = true
    this.corporateId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile);

      if (!this.corporateId) {
        console.error('Corporate ID is not set.');
        return;
      }
      

      // Call the service to upload the file
      this.authService.uploadEmployeeFile(this.corporateId, this.selectedFile).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          if (response && response.message) {
            alert(response.message);
            this.loading= false
            window.location.reload()
          } else {
            alert("Employees Payment Request sent to Admin");
            this.loading= false
            window.location.reload()


          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error uploading file:', err.message);
          console.error('Error details:', err); // Log the entire error object
          this.loading= false

        },
      });
    } else {
      console.error('No file selected.');
    
        alert("No file selected")
        this.loading= false

      
    }
  }
}

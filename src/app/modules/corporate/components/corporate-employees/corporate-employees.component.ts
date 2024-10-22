import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-corporate-employees',
  templateUrl: './corporate-employees.component.html',
  styleUrls: ['./corporate-employees.component.css'] // Corrected property name to 'styleUrls'
})
export class CorporateEmployeesComponent implements OnInit {
  employees: any; // Array to hold employees
  filteredEmployees: any; // Array to hold filtered employees
  id!: number; // Corporate ID
  searchTerm: string = ''; // Search term for filtering
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Number of items per page

  constructor(private authServices: AuthserviceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.authServices.getCorporateEmployeesById(this.id).subscribe(
      (response) => {
        this.employees = response; // Store the list of employees
        this.filteredEmployees = response; // Initialize filtered employees
        console.log(this.employees);
      },
      (error) => {
        console.log("Error: ", error.message);
      }
    );
  }

  // Function to filter employees based on the search term
  filterEmployees() {
    this.filteredEmployees = this.employees.filter((employee: { fullName: string; }) =>
      employee.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page on search
  }

  // Method to get the current page employees
  getCurrentPageEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Method to handle page change
  onPageChange(page: number) {
    this.currentPage = page;
  }

  // Method to calculate total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }
}

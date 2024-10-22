import { Component, OnInit } from '@angular/core'; 
import { AuthserviceService } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-corporate',
  templateUrl: './view-corporate.component.html',
  styleUrls: ['./view-corporate.component.css']
})
export class ViewCorporateComponent implements OnInit { 

  corporates: any[] = []; 
  filteredCorporates: any[] = []; 
  searchTerm: string = ''; 
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 5; // Number of items per page
  totalItems: number = 0; // Total number of items

  constructor(private authservices: AuthserviceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCorporates(); 
  }

  fetchCorporates() {
    this.authservices.getCorporates().subscribe(
      (response) => {
        this.corporates = response;
        this.filteredCorporates = response; 
        this.totalItems = response.length; // Set the total items for pagination
        console.log(response);
      },
      error => {
        console.error('Error fetching corporates:', error); 
      }
    );
  }

  filterCorporates() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase(); 
    this.filteredCorporates = this.corporates.filter(corporate =>
      corporate.corporateName.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.totalItems = this.filteredCorporates.length; // Update total items based on filtered results
    this.currentPage = 1; // Reset to first page after filtering
  }

  // New method to calculate total pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updateCorporate(id : number){
    console.log("button clicked");
    this.router.navigate([`admin/updateCorporate/${id}`])
  }
}

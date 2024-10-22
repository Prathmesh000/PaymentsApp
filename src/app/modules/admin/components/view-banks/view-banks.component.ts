import { Component, OnInit } from '@angular/core';
import { AuthserviceService, Ibank } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-banks',
  templateUrl: './view-banks.component.html',
  styleUrls: ['./view-banks.component.css']
})
export class ViewBanksComponent implements OnInit {

  banks: any;
  filteredBanks: any; // Array for filtered banks
  searchTerm: string = ''; // Search term for filtering
  loading: boolean = true;
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 6; // Number of items per page

  constructor(private authservices: AuthserviceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBanks();
  }

  fetchBanks() {
    this.authservices.getBanks().subscribe(
      (response) => {
        this.banks = response;
        this.filteredBanks = response; // Initialize filtered banks
        this.loading = false;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching banks:', error);
      }
    );
  }

  // Function to filter banks based on the search term
  filterBanks() {
    this.filteredBanks = this.banks.filter((bank: {bankName:string}) =>
      bank.bankName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page on search
  }

  // Method to get the current page banks
  getCurrentPageBanks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBanks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Method to handle page change
  onPageChange(page: number) {
    this.currentPage = page;
  }

  // Method to calculate total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredBanks.length / this.itemsPerPage);
  }
}

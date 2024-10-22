import { Component } from '@angular/core';
import { AuthserviceService } from '../../../../service/auth-services.service';
import { Router } from '@angular/router';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrl: './employee-report.component.css'
})
export class EmployeeReportComponent {

  reportData: any;
  chartOptions: any;
  loading : boolean = false;

  ngOnInit(): void {
    this.viewReport();
  }
  constructor(private authService: AuthserviceService, private router: Router) { }
 
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
 
 
  viewReport() {
    this.loading = true;
    this.authService.getEmployeeReport().subscribe(
      (response) => {
        console.log(response);
        this.reportData = response;
    this.loading = false;
        this.updateChartOptions();
      },
      (error) => {
        console.log("Error" + error);
      }
    )
  }
  get pieChartData() {
    return [this.reportData?.pendingCount, this.reportData?.approvedCount, this.reportData?.rejectedCount];
  }
  get pieChartLabels() {
    return ['Pending', 'Approved', 'Rejected'];
  }
 
  updateChartOptions() {
    if (this.reportData) {
      this.chartOptions = {
        series: [this.reportData.pendingCount, this.reportData.approvedCount, this.reportData.rejectedCount],
        chart: {
          type: 'pie',
          width: '500px',  // Set a fixed width
          height: '300px'  // Set a fixed height
        },
        labels: ['Pending', 'Approved', 'Rejected'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: '100%', // Makes it responsive for smaller screens
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
    }
  }
}

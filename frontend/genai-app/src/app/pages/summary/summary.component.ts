import { Component } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js'; // ADD this at the top

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HttpClientModule], // ✅ FIXED: added HttpClientModule
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType: ChartType = 'bar';

  chartOptions: ChartOptions = {
    responsive: true,
  };

  chartDataset = [
    {
      data: this.chartData,
      label: 'Model Accuracy',
    },
  ];

  constructor(private http: HttpClient) {
    this.loadChart();
  }

  loadChart() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>('http://localhost:3000/chart1', { headers }).subscribe((res) => {
      this.chartLabels = res.labels;
      this.chartData = res.values;
      this.chartDataset = [
        {
          data: this.chartData,
          label: 'Model Accuracy',
        },
      ];
    });
  }
}

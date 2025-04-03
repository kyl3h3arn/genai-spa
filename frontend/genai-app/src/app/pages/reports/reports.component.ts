import { Component } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HttpClientModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType: ChartType = 'line';

  chartOptions: ChartOptions = {
    responsive: true,
  };

  chartDataset = [
    {
      data: this.chartData,
      label: 'Generation Speed (ms)',
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

    this.http.get<any>('http://localhost:3000/chart2', { headers }).subscribe((res) => {
      this.chartLabels = res.labels;
      this.chartData = res.values;
      this.chartDataset = [
        {
          data: this.chartData,
          label: 'Generation Speed (ms)',
        },
      ];
    });
  }
}

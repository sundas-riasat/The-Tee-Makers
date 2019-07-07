import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartType, RadialChartOptions } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  pending = 0;
  done = 0;
  cancelled = 0;
  sent = 0;
  total = 0;

  constructor(private adminService: AdminService) {
    this.adminService.getTotals('pending').subscribe(x => {
      x.forEach(e =>{
        const t: any = e;
        this.pending += parseInt(t.total, 10);
      });
      this.total += this.pending;
    });
    this.adminService.getTotals('Delivered').subscribe(x => {
      x.forEach(e =>{
        const t: any = e;
        this.done += parseInt(t.total, 10);
      });
      this.total += this.done;
    });
    this.adminService.getTotals('Cancelled').subscribe(x => {
      x.forEach(e =>{
        const t: any = e;
        this.cancelled += parseInt(t.total, 10);
      });
    });
    this.adminService.getTotals('Sent Out').subscribe(x => {
      x.forEach(e =>{
        const t: any = e;
        this.sent += parseInt(t.total, 10);
      });
      this.total += this.sent;
    });
  }

  ngOnInit() {
  }

}

import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartType } from 'chart.js';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input('Labels') labels: string[]=[];
  @Input('Data') data: number[]=[];

  constructor() { }

  ngOnInit(): void {
  }


  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,123,255,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

}

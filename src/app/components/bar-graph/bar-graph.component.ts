import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent {

  @Input('Labels') labels: string[]=[];
  @Input('Data') data: number[]=[];


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: "blue"
    }   
  ]
  // barChartData: ChartDataSets[] = [
  //   { data: this.data, label: 'Best Fruits' }
  // ];

}

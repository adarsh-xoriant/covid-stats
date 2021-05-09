import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  globalData: GlobalDataSummary[]=[];
  totalConfirmed=0;
  totalActive=0;
  totalRecovered=0;
  totalDeaths=0;
  isLoading = true;
  // pieChart: GoogleChartInterface={
  //   chartType: 'PieChart'
  // };
  // columnChart: GoogleChartInterface={
  //   chartType: 'ColumnChart'
  // };

  countries: string[]=[];
  cases: number[]=[];

  constructor(private ds: DataServiceService) { 
    
  }

  initCharts(){
    this.globalData.forEach((cd)=>{

      if(cd.confirmed>1000000){
        this.countries.push(cd.country);
        this.cases.push(cd.confirmed);
      }

    });

  //   let casesData=[];
  //   casesData.push(["Country","Cases"]);

  //   this.globalData.forEach((cd)=>{
  //     let value=0;
  //     if(cd.confirmed>1000000){
  //       casesData.push([cd.country,cd.confirmed]);
  //     }
  //   });
  //   this.pieChart = {
  //     chartType: 'PieChart',
  //     dataTable: casesData,
  //     //firstRowIsData: true,
  //     options: {
  //       height:500
  //     }
  //   };

  //   this.columnChart = {
  //     chartType: 'ColumnChart',
  //     dataTable: casesData,
  //     //firstRowIsData: true,
  //     options: {
  //       height:500
  //     }
  //   };

  }

  ngOnInit(): void {
    let date = new Date();
    date.setDate(date.getDate() - 2);
    this.ds.getGlobalData(date).subscribe((response) => {
      this.globalData=response;
      this.globalData.forEach((cd)=>{
        if(!Number.isNaN(cd.confirmed)){
          this.totalConfirmed+= cd.confirmed;
          this.totalActive+= cd.active;
          this.totalRecovered+= cd.recovered;
          this.totalDeaths+= cd.deaths; 
        }
      })
      
      this.initCharts();
      this.isLoading = false;

    });
    
    

  }

  updateCharts(input:HTMLInputElement){
    let caseType=input.value;
    let value=0;
    let newData:number[]=[]
    this.globalData.forEach((cd)=>{
      if(cd.confirmed>1000000){
        if(caseType=="confirmed")
          value=cd.confirmed;
        if(caseType=="active")
          value=cd.active;
        if(caseType=="recovered")
          value=cd.recovered;
        if(caseType=="deaths")
          value=cd.deaths;
          newData.push(value);
      }
      
  });

  this.cases = newData;

  //   this.pieChart = {
  //     chartType: 'PieChart',
  //     dataTable: newCasesData,
  //     //firstRowIsData: true,
  //     options: {
  //       height:500
  //     }
  //   };

  //   this.columnChart = {
  //     chartType: 'ColumnChart',
  //     dataTable: newCasesData,
  //     //firstRowIsData: true,
  //     options: {
  //       height:500
  //     }
  //   };

  }
}

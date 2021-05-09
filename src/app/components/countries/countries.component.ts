import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  globalData: GlobalDataSummary[]=[];
  totalConfirmed=0;
  totalActive=0;
  totalRecovered=0;
  totalDeaths=0;
  countries: string[]=[];
  confirmedCasesTimeSeries: any = [];
  dates: string[] = [];
  countryTimeSeries: number[] =[];
  isLoading = true;

  constructor(private ds: DataServiceService) { }

  ngOnInit(): void {

    let date = new Date();
    date.setDate(date.getDate() - 2);

    this.ds.getGlobalData(date).subscribe((response)=>{

      this.globalData=response;
      this.globalData.forEach((cd)=>{

        this.countries.push(cd.country);

      });
      this.isLoading = false;
    });

    this.ds.getDateWiseData().subscribe( (response) => {
      console.log(response);
      this.confirmedCasesTimeSeries=response[0];
      this.dates = response[1];
      this.isLoading = false;
    });

  }

  updateValues(country: string){

    if(country=='Countries'){

      this.totalConfirmed=0;
      this.totalActive=0;
      this.totalRecovered=0;
      this.totalDeaths=0;
      this.countryTimeSeries=[];
    }

    else{

      this.globalData.forEach((cd)=>{

        if(cd.country==country){
          this.totalConfirmed=cd.confirmed;
          this.totalActive=cd.active;
          this.totalRecovered=cd.recovered;
          this.totalDeaths=cd.deaths;
        }

      });
      
      this.countryTimeSeries = this.confirmedCasesTimeSeries[country];
    }
  }



}

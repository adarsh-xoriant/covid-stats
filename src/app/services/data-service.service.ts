import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  // private globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/02-13-2021.csv';
  private dateWiseDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  
  constructor(private http: HttpClient) { }

  getGlobalData(date: Date){
    // the date that I'm getting is of two days before current day.
    let month: any = date.getMonth()+1;
    let datenum: any = date.getDate();
    if(month<10){
      month = "0"+month;
    }
    else{
      month = ""+month;
    }

    if(datenum<10){
      datenum = "0"+datenum;
    }

    console.log(month+'-'+datenum+'-'+date.getFullYear());

    let globalDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'+month+'-'+datenum+'-'+date.getFullYear()+'.csv';

    return this.http.get(globalDataUrl, {responseType: 'text'}).pipe(map(
      (result) =>{
        let data: GlobalDataSummary[] = [];
        let rows= result.split('\n');
        rows.splice(0,1);
        let raw: any={};
        // console.log(rows)
        for(let row of rows){

          let col=row.split(/,(?=\S)/);
          let cd={

            country:col[3],
            confirmed:+col[7],
            active:+col[10],
            recovered:+col[9],
            deaths:+col[8]

          };
          let temp=raw[cd.country];

          if(temp){
            temp.confirmed+=cd.confirmed;
            temp.active+=cd.active;
            temp.recovered+=cd.recovered;
            temp.deaths+=cd.deaths;
          }
          else
            raw[cd.country]=cd;
        }
        // console.log(raw)
        return <GlobalDataSummary[]>Object.values(raw);
      }
    ));

  }

  getDateWiseData(){

    return this.http.get(this.dateWiseDataUrl,{responseType: 'text'})
    .pipe(map((result) => {
      let rows = result.split('\n');
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      dates.splice(0,4);

      let mainData: any={}

      rows.forEach((row) => {
        let cols = row.split(/,(?=\S)/);
        let con = cols[1];
        cols.splice(0,4);

        if(con in mainData){
          let cases = mainData[con];
          cols.forEach((c,index) => {
            cases[index]+=+c
          });
          mainData[con] = cases;
        }
        else{
          mainData[con]=[];
          cols.forEach((c) => {
            mainData[con].push(+c);
          });
        }

      });
      return [mainData,dates];
    }));

  }

}

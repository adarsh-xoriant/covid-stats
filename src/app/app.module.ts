import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    PieChartComponent,
    BarGraphComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    ChartsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

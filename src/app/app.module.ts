import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ChartOlympicComponent } from "./components/chart-olympic/chart-olympic.component";
import {CountryDetailComponent} from "./components/country-detail/country-detail.component"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './pages/detail/detail.component';
import { TextBlockComponent } from './components/text-block/text-block.component';
import { HeaderComponent } from './Layout/header/header.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent,DetailComponent,],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    ChartOlympicComponent, 
    BrowserAnimationsModule, 
    CountryDetailComponent,
    TextBlockComponent, 
    HeaderComponent 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgFor } from '@angular/common';
import { Component,EventEmitter,Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { PieChart } from 'src/app/core/models/charts/piecharts';
@Component({
  selector: 'app-chart-olympic',
  standalone: true,
  imports: [NgFor,NgxChartsModule],
  templateUrl: './chart-olympic.component.html',
  styleUrl: './chart-olympic.component.scss'
})
export class ChartOlympicComponent {

  constructor(private router: Router) {}

view:[number,number]=[700,400];

//@Output
  @Input() data: PieChart[] = [];//Tableau d'interfaces PieChart
  @Output() selectedCountry = new EventEmitter<PieChart>();
gradient: boolean = false;
showLegend: boolean = false;
showLabels: boolean = true;
isDoughnut: boolean = false;
legendPosition: string = 'below';




onResize(event:any){
  if(event.target.innerWidth < 700){
this.view=[event.target.innerWidth,400]
}
else
this.view=[700,400]
//console.log(this.view);
}

onSelect(event: PieChart): void {

 let test = this.data.find((element) => element.name == event.name);
if(test){
 
  this.selectedCountry.emit(test);
}
}




}

import { NgFor } from '@angular/common';
import { Component,EventEmitter,Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { PieChart } from 'src/app/core/models/charts/piecharts';
@Component({
  selector: 'app-chart-olympic',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './chart-olympic.component.html',
  styleUrl: './chart-olympic.component.scss'
})
export class ChartOlympicComponent implements OnInit {

  constructor(private router: Router) {}

view:[number,number]=[700,400];

//@Output
  @Input() data: PieChart[] = [];//Tableau d'interfaces PieChart
  @Output() selectedCountry = new EventEmitter<PieChart>();
gradient: boolean = false;
showLegend: boolean = false;
showLabels: boolean = true;
isDoughnut: boolean = false;

screenWidth:number = window.innerWidth;
screenSized(elementSize:number): [number, number] {
 
  if (elementSize < 700) {
    return [elementSize, 400]; // Taille pour les écrans mobiles
  }
  return [700, 400]; // Taille pour les écrans plus larges
}

ngOnInit(): void {
  this.view = this.screenSized(this.screenWidth); // Appel initial pour définir la taille
}
onResize(event:any){
  this.view = this.screenSized(event.target.innerWidth);

}

onSelect(event: PieChart): void {

 let test = this.data.find((element) => element.name == event.name);
if(test){
 
  this.selectedCountry.emit(test);
}
}




}

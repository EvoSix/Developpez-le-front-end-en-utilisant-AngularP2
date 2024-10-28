import { NgFor } from '@angular/common';
import { Component,EventEmitter,Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chart-olympic',
  standalone: true,
  imports: [NgFor,NgxChartsModule],
  templateUrl: './chart-olympic.component.html',
  styleUrl: './chart-olympic.component.scss'
})
export class ChartOlympicComponent {

  constructor(private router: Router) {}



//@Output
  @Input() data: any[] = [];//Tableau d'interfaces olympic
  @Output() selectedCountry = new EventEmitter<any>();
gradient: boolean = false;
showLegend: boolean = true;
showLabels: boolean = true;
isDoughnut: boolean = false;
legendPosition: string = 'below';

colorScheme =
[ {name:"Germany",value:'#a8385d'},
 
  {name:"France",value:'#a27ea8'},
  {name:"United States",value:'#7aa3e5'},
  {name:"Spain",value:'#adcded'},
  {name:"Italy",value:'#a95963'}
];




onSelect(event: any): void {

 let test = this.data.find((element) => element.name == event.name);
if(test){
  this.selectedCountry.emit(test);
}
}




}

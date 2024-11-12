import { Component,Input,OnInit,SimpleChanges } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  @Input() data: any[] = [];
 
   @Input() xAxisLabel:string=""
  view:[number,number]=[700,400];

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;

  
  timeline: boolean = true;
  screenWidth:number = window.innerWidth;
  legendPosition: string = 'below';
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  constructor (){

   
  }
  screenSized(elementSize:number): [number, number] {
 
    if (elementSize < 700) {
      return [elementSize, 400]; // Taille pour les écrans mobiles
    }
    return [700, 400]; // Taille pour les écrans plus larges
  }
  
  ngOnInit(): void {
    this.view = this.screenSized(this.screenWidth); // Appel initial pour définir la taille
  }
  onResize(event:Event){
    const target = event.target as Window; 

  this.view = this.screenSized(target.innerWidth);
 
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      console.log('Data received in CountryDetailComponent:', this.data);
      // `data` a été mis à jour, vous pouvez faire ici toute autre manipulation nécessaire
    }
  }

}

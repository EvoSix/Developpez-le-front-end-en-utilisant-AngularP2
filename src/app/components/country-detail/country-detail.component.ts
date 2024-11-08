import { Component,Input,SimpleChanges } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent {
  @Input() data: any[] = [];
  
  //view: [number,number] = [700, 300];

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
 
  legendPosition: string = 'below';
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  constructor (){

   
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      console.log('Data received in CountryDetailComponent:', this.data);
      // `data` a été mis à jour, vous pouvez faire ici toute autre manipulation nécessaire
    }
  }

}

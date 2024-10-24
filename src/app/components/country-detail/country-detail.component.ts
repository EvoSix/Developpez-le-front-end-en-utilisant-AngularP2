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
  @Input() data: Olympic[] = [];
  transformdata: any[]=[];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
 
  legendPosition: string = 'below';
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  constructor (){
    console.log(this.data);
  }

private resultRemap():Olympic[]{



}


  ngOnChanges(changes: SimpleChanges): void //On Recalcule lors du changment de data. oninit ne le fait pas, et retourne un tableau vide
  {
    if (changes['data'] && this.data) {
      this.transformdata= this.data;
    }
  
  }

}

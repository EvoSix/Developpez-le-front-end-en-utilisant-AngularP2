import { NgFor } from '@angular/common';
import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';//import du model d'interface olympic
import { Participation } from 'src/app/core/models/Participation';
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

  constructor(private router: Router) {}//PK ???????????,




  @Input() data: Olympic[] = [];//Tableau d'interfaces olympic
transtormData: any[]= []; //Mise en forme de donnée si necessaires
countryTotal:number =0;//Initialise le nombre totale de pays
joTotal:number=0;
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

private Counting(olympicData:Olympic[]):void
{


this.countryTotal=olympicData.length;

}

private CountingJO(superdata:Olympic[]):void
{
  const yearsfilter: number[]= [];
  
  superdata.forEach
  (
    id => 
    {
    id.participations.forEach
    (
      years =>  
        
        {
          yearsfilter.push(years.year);


    }
    )
  }
  )

  const yearsfiltered= yearsfilter.filter(function(elem,index,self){return index === self.indexOf(elem)} )

    this.joTotal=yearsfiltered.length;
  };



private CountingMedals (megadata:Olympic[]):void
{
  const medalsobj: {id:number,name:string, value:number}[]=[];

  
  megadata.forEach(
    jo=>{
      medalsobj.push({id:jo.id,name:jo.country,value:this.Totalmedals(jo.participations)});
     
    }
  )
 this.transtormData=medalsobj;
}

private Totalmedals(paticipation: Participation[]):number
{
  let totalM:number=0;

  paticipation.forEach(m=>{
totalM= totalM+ m.medalsCount;
console.log(m.athleteCount+":"+ totalM);
 } )
  return totalM

}


onSelect(event: any): void {
  console.log('Item clicked', event.name);
this.router.navigate(['/detail',event.name]);
}

ngOnChanges(changes: SimpleChanges): void //On Recalcule lors du changment de data. oninit ne le fait pas, et retourne un tableau vide
{
  if (changes['data'] && this.data) {
    this.Counting(this.data); 
    this.CountingJO(this.data);
    this.CountingMedals(this.data);
  }

}


}

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<Olympic[]>;
  result: Olympic[]=[];
  transtormData: any[] = []; //Mise en forme de donnée si necessaires
  countryTotal: number = 0;//Initialise le nombre totale de pays
  joTotal: number = 0;



  constructor(private olympicService: OlympicService,private router: Router) {

    this.olympics$ = this.olympicService.getOlympics();


  }



  private Counting(olympicData: Olympic[]): void {


    this.countryTotal = olympicData.length;

  }

  private CountingJO(superdata: Olympic[]): void {
    const yearsfilter: number[] = [];

    superdata.forEach
      (
        id => {
          id.participations.forEach
            (
              years => {
                yearsfilter.push(years.year);


              }
            )
        }
      )

    const yearsfiltered = yearsfilter.filter(function (elem, index, self) { return index === self.indexOf(elem) })

    this.joTotal = yearsfiltered.length;
  };



  private CountingMedals(megadata: Olympic[]): void {
    const medalsobj: { id: number, name: string, value: number }[] = [];


    megadata.forEach(
      jo => {
        medalsobj.push({ id: jo.id, name: jo.country, value: this.Totalmedals(jo.participations) });

      }
    )
    this.transtormData = medalsobj;
  }


  private Totalmedals(paticipation: Participation[]): number {
    let totalM: number = 0;

    paticipation.forEach(m => {
      totalM = totalM + m.medalsCount;
      console.log(m.athleteCount + ":" + totalM);
    })
    return totalM

  }


  onSelectCountry($event: any) {
    if ($event && $event.id) {
      this.router.navigate(['/detail', $event.id]); // Navigate with test.id
    }
   
  }


///pk reassigne dans details , mais pas ici

  ngOnInit(): void {
    this.olympics$.subscribe((data: Olympic[]) => {
      if (data) {
        this.Counting(data);        
        this.CountingJO(data);       
        this.CountingMedals(data);   
      }
    });

  }
}

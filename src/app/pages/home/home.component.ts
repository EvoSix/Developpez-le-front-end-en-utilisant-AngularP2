import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { Router } from '@angular/router';
import { PieChart } from 'src/app/core/models/charts/piecharts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null>
  private olympicsSubscription!: Subscription;
  result: Olympic[] = [];
  transtormData: PieChart[] = []; //Mise en forme de donnée si necessaires
  countryTotal: number = 0; //Initialise le nombre totale de pays
  joTotal: number = 0;
  title: string = '';
  title2: string = '';

  constructor(private olympicService: OlympicService, private router: Router) {
    this.olympics$ = this.olympicService.getOlympics();
  }

  private numberCountry(olympicData: Olympic[]): number {
    return olympicData.length;
  }

  private numberJO(superdata: Olympic[]): number {
    const yearsfilter: number[] = [];

    superdata.forEach((id) => {
      id.participations.forEach((years) => {
        yearsfilter.push(years.year);
      });
    });
    const yearsfiltered = yearsfilter.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    return yearsfiltered.length;
  }

  private calculMedals(megadata: Olympic[]): PieChart[] {
    const medalsobj: PieChart[] = [];

    megadata.forEach((jo) => {
      medalsobj.push({
        id: jo.id,
        name: jo.country,
        value: this.participationMedals(jo.participations),
      });
    });

    return medalsobj;
  }

  private participationMedals(paticipation: Participation[]): number {
    let totalM: number = 0;

    paticipation.forEach((m) => {
      totalM = totalM + m.medalsCount;
      console.log(m.athleteCount + ':' + totalM);
    });
    return totalM;
  }

  onSelectCountry($event: PieChart) {
    if ($event && $event.id) {
      this.router.navigate(['/detail', $event.id]); // Navigate with test.id
    }
  }

  ngOnInit(): void {
    this.olympicsSubscription = this.olympics$.subscribe((data: Olympic[]| null) => {
      if (data) {
        this.countryTotal = this.numberCountry(data);
        this.joTotal = this.numberJO(data);
        this.transtormData = this.calculMedals(data);
      }
    });
  }
  ngOnDestroy(): void {
    this.olympicsSubscription.unsubscribe();
  }
}

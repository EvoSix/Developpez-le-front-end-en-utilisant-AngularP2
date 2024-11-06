import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, of, Subscription } from 'rxjs';
import { Participation } from 'src/app/core/models/Participation';
import { LineChart, SeriesL } from 'src/app/core/models/charts/linechart';
@Component({
  selector: 'app-detail',

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic>;
  private olympicsSubscription: Subscription = new Subscription;
  id!: number; //Pk ! ?
  gg: LineChart[] = [];
  pagetitle: string = '';
  title1: string = 'Number of entries';
  title2: string = 'Total number of medals';
  title3: string = 'Total number of athletes';
  totalentries: number = 0;
  totalmedals: number = 0;
  totalathlete: number = 0;
  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'))!;
    this.olympics$ = this.olympicService.getCountry(this.id);
  }
 

  private dataTransform(megadata: Olympic): LineChart[] {
    const medalsobj: LineChart[] = [{
      name: megadata.country,
      series: this.participeToSerie(megadata.participations),
    }];

   return medalsobj;
  }

  private participeToSerie(paticipation: Participation[]): any {
    let medalsCounting: number = 0;
    let participation: number = 0;
    let athletes: number = 0;
    let series: SeriesL[] = [];
    paticipation.forEach((m) => {
      series.push({ name: m.year.toString(), value: m.medalsCount });
      participation++;
      medalsCounting += m.medalsCount;
      athletes += m.athleteCount;
    });
    this.totalmedals = medalsCounting;
    this.totalentries = participation;
    this.totalathlete = athletes;
    return series;
  }

  onClick() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.olympicsSubscription= this.olympics$.subscribe((data: Olympic) => {
      if (data) {
        
        this.gg = this.dataTransform(data);
        this.pagetitle = data.country;
      }
    });
   
  }

  ngOnDestroy(): void {
    this.olympicsSubscription.unsubscribe();

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, of } from 'rxjs';
import { Participation } from 'src/app/core/models/Participation';
import { LineChart, SeriesL } from 'src/app/core/models/charts/linechart';
@Component({
  selector: 'app-detail',

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  public olympics$: Observable<Olympic>;
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
    private olympicService: OlympicService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'))!;
    this.olympics$ = this.olympicService.getCountry(this.id);
  }

  private dataTransform(megadata: Olympic): void {
    const medalsobj: LineChart = {
      name: megadata.country,
      series: this.participeToSerie(megadata.participations),
    };

    this.gg.push(medalsobj);
  }

  private participeToSerie(paticipation: Participation[]): any {
    let medalsCounting: number = 0;
    let participation: number = 0;
    let athletes:number=0;
    let series: SeriesL[] = [];
    paticipation.forEach((m) => {
      series.push({ name: m.year.toString(), value: m.medalsCount });
      participation++;
      medalsCounting += m.medalsCount;
      athletes+=m.athleteCount;
    });
    this.totalmedals = medalsCounting;
    this.totalentries=participation;
    this.totalathlete=athletes;
    return series;
  }

  ngOnInit(): void {
    this.olympics$.subscribe((data: Olympic) => {
      if (data) {
        this.dataTransform(data);
        this.gg = [...this.gg]; 
        this.pagetitle = data.country;
      }
    });
  }
}

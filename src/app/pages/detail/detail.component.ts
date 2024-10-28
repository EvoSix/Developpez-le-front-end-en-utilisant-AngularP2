import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, of } from 'rxjs';
import { Participation } from 'src/app/core/models/Participation';
@Component({
  selector: 'app-detail',


  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public olympics$: Observable<Olympic>;
  id!: number; //Pk ! ?
  gg: any[] = [];
  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {




    this.id = Number(this.route.snapshot.paramMap.get('id'))!;
    this.olympics$ = this.olympicService.getCountry(this.id);

  }


  private dataTransform(megadata: Olympic): void {

    let i: number = 0

    const medalsobj: { name: string, series: { name: string, value: number }[] } = ({ name: megadata.country, series: this.participeToSerie(megadata.participations) });



    this.gg.push(medalsobj);

  }



  private participeToSerie(paticipation: Participation[]): any {


    let series: { name: string, value: number }[] = [];
    paticipation.forEach(m => {


      series.push({ name: m.year.toString(), value: m.medalsCount });


    })

    return series;



  }


  ngOnInit(): void {
    this.olympics$.subscribe((data: Olympic) => {
      if (data) {
        this.dataTransform(data);
        this.gg = [...this.gg]; ////mais pk ? cheminement
      }


    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-detail',
  

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
 
  public olympics$: Observable<Olympic[]>;
  id!: string; //Pk ! ?
  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {
    this.id = this.route.snapshot.paramMap.get('id')!;     //pk +??? pk ! al a fin ????
    this.olympics$ = this.olympicService.getCountry(this.id);
  }
  


  ngOnInit(): void {

  }

}

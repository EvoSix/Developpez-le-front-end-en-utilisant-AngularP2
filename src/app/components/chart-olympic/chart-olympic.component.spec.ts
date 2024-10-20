import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOlympicComponent } from './chart-olympic.component';

describe('ChartOlympicComponent', () => {
  let component: ChartOlympicComponent;
  let fixture: ComponentFixture<ChartOlympicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartOlympicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOlympicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

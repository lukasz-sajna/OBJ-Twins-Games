import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsCardComponent } from './match-details-card.component';
import { MatchDetails } from 'src/app/models/match-details';

describe('MatchDetailsCardComponent', () => {
  let component: MatchDetailsCardComponent;
  let fixture: ComponentFixture<MatchDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailsCardComponent);
    component = fixture.componentInstance;
    component.matchDetails = {
      map: 'de_dust2'
    } as MatchDetails;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

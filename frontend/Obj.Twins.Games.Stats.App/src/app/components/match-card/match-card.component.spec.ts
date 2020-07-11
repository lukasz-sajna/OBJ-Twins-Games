import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCardComponent } from './match-card.component';
import { Match } from 'src/app/models/match';

describe('MatchCardComponent', () => {
  let component: MatchCardComponent;
  let fixture: ComponentFixture<MatchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCardComponent);
    component = fixture.componentInstance;
    component.match = {
      map: 'de_dust2',
      teams: [{}, {}]
    } as Match;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

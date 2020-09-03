import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCardComponent } from './match-card.component';
import { PlayerMatch } from 'src/app/models/player-match';

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
      teams: [{ name: 'Team A', flag: 'pl', score: 15 }, { name: 'Team B', flag: 'pl', score: 15 }]
    } as PlayerMatch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

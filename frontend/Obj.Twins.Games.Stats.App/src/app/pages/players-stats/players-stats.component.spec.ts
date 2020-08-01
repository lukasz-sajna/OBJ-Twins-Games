import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersStatsComponent } from './players-stats.component';
import { PlayerStatsTableComponent } from 'src/app/components/player-stats-table/player-stats-table.component';
import { Observable, of } from 'rxjs';
import { Store, MemoizedSelector } from '@ngrx/store';
import { StatsState } from 'src/app/store/state/match-state';
import { Match } from 'src/app/models/match';

describe('PlayersStatsComponent', () => {
  let component: PlayersStatsComponent;
  let fixture: ComponentFixture<PlayersStatsComponent>;

  const storeMock = {
    select(): Observable<any> {
      return of({});
    },
    pipe(): Observable<any> {
      return of({});
    },
    dispatch(): Observable<any> {
      return of({});
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersStatsComponent, PlayerStatsTableComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

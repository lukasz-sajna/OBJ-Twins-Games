/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeamStatsComponent } from './team-stats.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('TeamStatsComponent', () => {
  let component: TeamStatsComponent;
  let fixture: ComponentFixture<TeamStatsComponent>;

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
      declarations: [ TeamStatsComponent ],
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
    fixture = TestBed.createComponent(TeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

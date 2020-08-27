import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsComponent } from './match-details.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('MatchDetailsComponent', () => {
  let component: MatchDetailsComponent;
  let fixture: ComponentFixture<MatchDetailsComponent>;

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
      declarations: [ MatchDetailsComponent ],
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
    fixture = TestBed.createComponent(MatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

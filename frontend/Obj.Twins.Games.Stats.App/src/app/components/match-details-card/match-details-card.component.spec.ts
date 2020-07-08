import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsCardComponent } from './match-details-card.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailsTableComponent } from './match-details-table.component';

describe('MatchDetailsTableComponent', () => {
  let component: MatchDetailsTableComponent;
  let fixture: ComponentFixture<MatchDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatsTableComponent } from './player-stats-table.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PlayerStatsTableComponent', () => {
  let component: PlayerStatsTableComponent;
  let fixture: ComponentFixture<PlayerStatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerStatsTableComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

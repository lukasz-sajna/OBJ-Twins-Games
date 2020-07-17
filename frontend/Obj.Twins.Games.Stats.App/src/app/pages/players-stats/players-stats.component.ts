import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerInfo } from 'src/app/models/player-info';
import { Store } from '@ngrx/store';
import { playersStatsRequested } from 'src/app/store/actions/stats.actions';
import { playersStatsSelector, isLoadingSelector } from 'src/app/store/selectors/stats-state.selector';
import { StatsState } from 'src/app/store/state/stats-state';
import { HeightCalcService } from 'src/app/services/height-calc.service';

@Component({
  selector: 'app-players-stats',
  templateUrl: './players-stats.component.html',
  styleUrls: ['./players-stats.component.scss']
})
export class PlayersStatsComponent implements OnInit {
  public playersData$: Observable<PlayerInfo[]>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<StatsState>) {
    this.playersData$ = this.store.select(playersStatsSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  public ngOnInit(): void {
    this.store.dispatch(playersStatsRequested());
  }

  public rowClicked(playerId: string): void {
    console.log(`Open player details: ${playerId}`);
  }

  public get ContainerHeight(): string {
    const header = document.getElementById('header');
    if (header) {
      return `calc(100vh - ${header.getBoundingClientRect().height + 30}px)`;
    }
    return '0';
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerInfo } from 'src/app/models/player-info';
import { Store } from '@ngrx/store';
import { openPlayerDetails, playersStatsRequested } from 'src/app/store/actions/player.actions';
import { allPlayersSelector, playersStatsPerMatchSelector } from 'src/app/store/selectors/players-state.selector';
import { MatchState } from 'src/app/store/state/match-state';
import { isLoadingSelector } from 'src/app/store/selectors/match-state.selector';

@Component({
  selector: 'app-players-stats',
  templateUrl: './players-stats.component.html',
  styleUrls: ['./players-stats.component.scss']
})
export class PlayersStatsComponent implements OnInit {
  public playersData$: Observable<PlayerInfo[]>;
  public playersDataPerMatch$: Observable<PlayerInfo[]>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<MatchState>) {
    this.playersData$ = this.store.select(allPlayersSelector);
    this.playersDataPerMatch$ = this.store.select(playersStatsPerMatchSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

  public ngOnInit(): void {
    this.store.dispatch(playersStatsRequested());
  }

  public rowClicked(playerId: string): void {
    this.store.dispatch(openPlayerDetails({id: playerId}));
  }

  public get ContainerHeight(): string {
    const header = document.getElementById('header');
    if (header) {
      return `calc(100vh - ${header.getBoundingClientRect().height + 30}px)`;
    }
    return '0';
  }

}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { openMatches, openPlayersStats, openTeamsStats } from 'src/app/store/actions/header.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private store: Store) { }

  public openMatches(): void {
    this.store.dispatch(openMatches());
  }

  public openPlayersStats(): void {
    this.store.dispatch(openPlayersStats());
  }

  public openTeams(): void {
    this.store.dispatch(openTeamsStats());
  }

}

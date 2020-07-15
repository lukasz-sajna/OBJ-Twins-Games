import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatchDetails } from 'src/app/models/match-details';
import { matchDetailsSelector } from 'src/app/store/selectors/stats-state.selector';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { MapBackgroundService } from 'src/app/services/map-background.service';
import { matchDetailsRequested } from 'src/app/store/actions/stats.actions';
import { selectRouteParamsSelector } from 'src/app/store/selectors/global-state.selectors';

@UntilDestroy()
@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit {
  public matchDetails$: Observable<MatchDetails>;

  constructor(private store: Store<any>, private backgroundService: MapBackgroundService) {
    this.matchDetails$ = this.store.select(matchDetailsSelector);
  }

  public ngOnInit(): void {
    this.store.select(selectRouteParamsSelector).pipe(
      untilDestroyed(this),
      tap(params => this.store.dispatch(matchDetailsRequested({ matchId: params.id })))
    ).subscribe();
  }

  public get BackgroundUrl(): string {
    // console.log(`linear-gradient(180deg, rgba(#ffffff, 0), rgba(#ffffff, 1) 75%),
    // url("${this.backgroundService.getBackgroundUrl(this.matchDetails.map)}");`);
    // return `linear-gradient(180deg, rgba(#ffffff, 0), rgba(#ffffff, 1) 75%),
    // url("${this.backgroundService.getBackgroundUrl(this.matchDetails.map)}");`;

    return this.backgroundService.getBackgroundUrl('de_dust2');
  }

  public get ContainerHeight(): string {
    const header = document.getElementById('header');
    if (header) {
      return `calc(100vh - ${header.getBoundingClientRect().height + 30}px)`;
    }
    return '0';
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }

}

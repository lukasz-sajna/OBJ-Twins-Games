import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { tap, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatchResult } from 'src/app/models/match-result.enum';

@UntilDestroy()
@Component({
  selector: 'app-team-stats-table',
  templateUrl: './team-stats-table.component.html',
  styleUrls: ['./team-stats-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeamStatsTableComponent implements OnInit, OnDestroy {
  @Input()
  public teams: Observable<Team[]> = new Observable();

  @Input()
  public isLoading = false;

  @Output()
  public showTeamDetails: EventEmitter<string> = new EventEmitter();

  @Output()
  public playerClicked: EventEmitter<string> = new EventEmitter();

  public matchResult: typeof MatchResult = MatchResult;

  public displayedColumns: string[] = [];

  public expandedElement: Team;

  public dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>([]);

  public noData$ = this.dataSource.connect().pipe(
    map(data => data.length === 0)
  );

  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  public ngOnInit(): void {
    this.displayedColumns = ['name', 'wins', 'draws', 'loses', 'winRatio', 'matchesPlayed', 'streak'];

    this.teams.pipe(
      untilDestroyed(this),
      tap(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      })
    ).subscribe();
  }

  public ngOnDestroy(): void { }

  public onShowTeamDetailsClicked(teamId: string): void {
    this.showTeamDetails.emit(teamId);
  }

  public onPlayerClicked(playerId: string): void {
    this.playerClicked.emit(playerId);
  }

  public decimalToPercent(decimal: number): string {
    return `${(decimal * 100).toFixed(2)} %`;
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }

  public matchResultShortName(matchResult: MatchResult): string {
    switch (matchResult) {
      case MatchResult.Win:
        return 'W';
      case MatchResult.Draw:
        return 'D';
      case MatchResult.Lost:
        return 'L';
      default:
        break;
    }
  }

}

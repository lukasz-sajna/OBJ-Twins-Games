import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { tap, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-team-stats-table',
  templateUrl: './team-stats-table.component.html',
  styleUrls: ['./team-stats-table.component.scss']
})
export class TeamStatsTableComponent implements OnInit, OnDestroy {
  @Input()
  public teams: Observable<Team[]> = new Observable();

  @Input()
  public isLoading = false;

  @Output()
  public rowClicked: EventEmitter<string> = new EventEmitter();

  public displayedColumns: string[] = [];

  public dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>([]);

  public noData$ = this.dataSource.connect().pipe(
    map(data => data.length === 0)
  );

  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  public ngOnInit(): void {
    this.displayedColumns = ['name', 'wins', 'draws', 'loses', 'winRatio', 'matchesPlayed'];

    this.teams.pipe(
      untilDestroyed(this),
      tap(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      })
    ).subscribe();
  }

  public ngOnDestroy(): void { }

  public onRowClicked(teamId: string): void {
    this.rowClicked.emit(teamId);
  }

  public decimalToPercent(decimal: number): string {
    return `${decimal * 100} %`;
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }

}

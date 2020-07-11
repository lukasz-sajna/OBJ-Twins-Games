import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PlayerInfo } from 'src/app/models/player-info';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-player-stats-table',
  templateUrl: './player-stats-table.component.html',
  styleUrls: ['./player-stats-table.component.scss']
})
export class PlayerStatsTableComponent implements OnInit, OnDestroy {
  @Input()
  public playersData: Observable<PlayerInfo[]> = new Observable();

  @Input()
  public isLoading = false;

  @Output()
  public rowClicked: EventEmitter<string> = new EventEmitter();

  public displayedColumns: string[] = ['name', 'kills', 'assists', 'deaths', 'kdRatio', 'mvp', 'matchesPlayed', 'score'];
  public dataSource: MatTableDataSource<PlayerInfo> = new MatTableDataSource<PlayerInfo>([]);

  public noData$ = this.dataSource.connect().pipe(
    map(data => data.length === 0)
  );

  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  public ngOnInit(): void {
    this.playersData.pipe(
      untilDestroyed(this),
      tap(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      })
    ).subscribe();
  }

  public ngOnDestroy(): void { }

  public onRowClicked(profileUrl: string): void {
    // this.rowClicked.emit(profileUrl);
  }

}

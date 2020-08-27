import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { PlayerDetails } from 'src/app/models/player-details';
import { MatchResult } from 'src/app/models/match-result.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerStatsComponent implements OnChanges {
  @Input()
  public playerInfo: PlayerDetails;

  @Input()
  public isLoading = true;

  public matchResult: typeof MatchResult = MatchResult;

  public chartColumnsSelection = { kdRatio: true, kills: false, assists: false, deaths: false, mvps: false };

  public chartData: any = [];
  public fullChartData: any = [];

  public dataColumns = [
    'Date', 'K/D'
  ];

  public chartOptions = {
    chartArea: { left: 25, top: 10, width: '100%', height: '75%' },
    is3D: false,
    width: '100%',
    legend: {
      position: 'bottom'
    },
    hAxis: {
      slantedTextAngle: 45,
      textPosition: 'none',
      textStyle: {
      }
    },
    vAxis: {
      viewWindow: {
        min: 0
      }
    },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        auraColor: 'none'
      }
    }
  };

  public ngOnChanges(): void {
    this.prepareFullChartData();
    this.chartColumnsChanged();
  }

  public winRateDecimalToPercent(input: number): string {
    return `${(input * 100).toFixed(2)}%`;
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

  public chartColumnsChanged(): void {
    this.dataColumns = this.prepareDataColumns();
    this.chartData = this.setChartData();
  }

  private prepareFullChartData(): void {
    this.fullChartData = [];

    for (let index = 0; index < this.playerInfo.kills.length; index++) {
      this.fullChartData.push(
        [
          new Date(this.playerInfo.kdRatios[index].date).toLocaleString(),
          this.playerInfo.kdRatios[index].value,
          this.playerInfo.kills[index].value,
          this.playerInfo.assists[index].value,
          this.playerInfo.deaths[index].value,
          this.playerInfo.mvps[index].value,
        ]
      );
    }
  }

  private setChartData(): any {
    const columnindexesToRemove = this.getColumnIndexesToRemove();
    let data: any[] = [];
    data = JSON.parse(JSON.stringify(this.fullChartData));

    for (let index = columnindexesToRemove.length - 1; index >= 0; index--) {
      data.forEach((element: []) => {
        element.splice(columnindexesToRemove[index], 1);
      });
    }

    return data;
  }

  private prepareDataColumns(): string[] {
    const columns = ['Date'];
    if (this.chartColumnsSelection.kdRatio) {
      columns.push('K/D Ratio');
    }
    if (this.chartColumnsSelection.kills) {
      columns.push('Kills');
    }
    if (this.chartColumnsSelection.assists) {
      columns.push('Assists');
    }
    if (this.chartColumnsSelection.deaths) {
      columns.push('Deaths');
    }
    if (this.chartColumnsSelection.mvps) {
      columns.push('Mvps');
    }

    return columns;
  }

  private getColumnIndexesToRemove(): number[] {
    const indexes: number[] = [];
    if (!this.chartColumnsSelection.kdRatio) {
      indexes.push(1);
    }
    if (!this.chartColumnsSelection.kills) {
      indexes.push(2);
    }
    if (!this.chartColumnsSelection.assists) {
      indexes.push(3);
    }
    if (!this.chartColumnsSelection.deaths) {
      indexes.push(4);
    }
    if (!this.chartColumnsSelection.mvps) {
      indexes.push(5);
    }

    return indexes;
  }

  public get DisableChartFilter(): boolean {
    let filterCounter = 0;
    filterCounter += this.chartColumnsSelection.kdRatio ? 1 : 0;
    filterCounter += this.chartColumnsSelection.kills ? 1 : 0;
    filterCounter += this.chartColumnsSelection.assists ? 1 : 0;
    filterCounter += this.chartColumnsSelection.deaths ? 1 : 0;
    filterCounter += this.chartColumnsSelection.mvps ? 1 : 0;
    return filterCounter <= 1;
  }

}

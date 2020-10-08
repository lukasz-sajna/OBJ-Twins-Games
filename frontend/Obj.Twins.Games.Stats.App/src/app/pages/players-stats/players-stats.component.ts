import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SatDatepickerRangeValue } from "saturn-datepicker";
import { DateRange } from "src/app/models/date-range";
import { PlayerInfo } from "src/app/models/player-info";
import {
  openPlayerDetails,
  playersStatsFilterChanged,
  playersStatsRequested,
} from "src/app/store/actions/player.actions";
import {
  allPlayersSelector,
  playersStatsPerMatchSelector,
} from "src/app/store/selectors/players-state.selector";
import { MatchState } from "src/app/store/state/match-state";
import {
  filteredPlayersStatsPerMatchSelector,
  isLoadingSelector,
  playersFilterSelector,
} from "./../../store/selectors/players-state.selector";

@UntilDestroy()
@Component({
  selector: "app-players-stats",
  templateUrl: "./players-stats.component.html",
  styleUrls: ["./players-stats.component.scss"],
})
export class PlayersStatsComponent implements OnInit, OnDestroy {
  public playersData$: Observable<PlayerInfo[]>;
  public playersDataPerMatch$: Observable<PlayerInfo[]>;
  public filteredPlayers$: Observable<PlayerInfo[]>;
  public isLoading$: Observable<boolean>;

  form: FormGroup;
  mapsControl = new FormControl();
  dateRangeControl = new FormControl();

  constructor(private store: Store<MatchState>, private fb: FormBuilder) {
    this.playersData$ = this.store.select(allPlayersSelector);
    this.playersDataPerMatch$ = this.store.select(playersStatsPerMatchSelector);
    this.filteredPlayers$ = this.store
      .select(filteredPlayersStatsPerMatchSelector);

    this.isLoading$ = this.store.select(isLoadingSelector);

    this.form = this.fb.group({
      date: [{ begin: new Date(2020, 0, 1), end: new Date(2021, 11, 31) }],
    });

    this.store
      .select(playersFilterSelector)
      .pipe(
        untilDestroyed(this),
        tap((dateRange) => {
          this.form.setValue(
            {
              date: {
                begin: dateRange.begin,
                end: dateRange.end,
              } as SatDatepickerRangeValue<Date>,
            },
            { emitEvent: false }
          );
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.store.dispatch(playersStatsRequested());
    this.store.dispatch(
      playersStatsFilterChanged({
        dateRange: this.convertDatePickerRange({
          begin: new Date(2020, 0, 1),
          end: new Date(2021, 11, 31),
        }),
      })
    );
  }

  ngOnDestroy(): void {}

  public dateChanged(event: any): void {
    if (event.value) {
      this.store.dispatch(
        playersStatsFilterChanged({
          dateRange: this.convertDatePickerRange(event.value),
        })
      );
    }
  }

  private convertDatePickerRange(
    range: SatDatepickerRangeValue<Date>
  ): DateRange {
    return { begin: range.begin, end: range.end } as DateRange;
  }

  public rowClicked(playerId: string): void {
    this.store.dispatch(openPlayerDetails({ id: playerId }));
  }

  public get ContainerHeight(): string {
    const header = document.getElementById("header");
    if (header) {
      return `calc(100vh - ${header.getBoundingClientRect().height + 30}px)`;
    }
    return "0";
  }
}

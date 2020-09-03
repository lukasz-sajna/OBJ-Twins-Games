import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MapItem } from 'src/app/models/map-item';
import { MatchState } from 'src/app/store/state/match-state';
import { Store } from '@ngrx/store';
import { filterSelector, matchesMapsSelector } from 'src/app/store/selectors/match-state.selector';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { tap, withLatestFrom } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { DateRange } from 'src/app/models/date-range';
import { filterChangedRequested } from 'src/app/store/actions/match.actions';
import { SatDatepickerRangeValue } from 'saturn-datepicker';

@UntilDestroy()
@Component({
  selector: 'app-match-filter',
  templateUrl: './match-filter.component.html',
  styleUrls: ['./match-filter.component.scss']
})
export class MatchFilterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  mapsControl = new FormControl();
  dateRangeControl = new FormControl();
  maps: MapItem[] = [];

  constructor(private store: Store<MatchState>, private fb: FormBuilder) {
    this.form = this.fb.group({
      date: [{ begin: new Date(2000, 0, 1), end: new Date() }]
    });

    this.store.select(filterSelector).pipe(
      untilDestroyed(this),
      withLatestFrom(this.store.select(matchesMapsSelector)),
      tap(([filter, maps]) => {
        this.maps = maps,
        this.mapsControl = new FormControl(filter.maps);
        this.form.setValue({date: {begin: filter.dateRange.begin, end: filter.dateRange.end} as SatDatepickerRangeValue<Date>}, {emitEvent: false});
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

  public mapsChanged(event: MatSelectChange): void {
    this.store.dispatch(filterChangedRequested(
      {
        filter: { maps: event.value, dateRange: this.convertDatePickerRange(this.form.get('date').value), isDefault: false }
      }));
  }

  public dateChanged(event: any): void {
    if(event.value){
      console.log(event.value);
      this.store.dispatch(filterChangedRequested(
        {
          filter: { maps: this.mapsControl.value, dateRange: this.convertDatePickerRange(event.value), isDefault: false }
        }));

    }
    
  }

  private convertDatePickerRange(range: SatDatepickerRangeValue<Date>): DateRange {
    return { begin: range.begin, end: range.end } as DateRange;
  }
}

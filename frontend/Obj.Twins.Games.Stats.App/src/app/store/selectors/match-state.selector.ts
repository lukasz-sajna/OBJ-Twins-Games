import { createFeatureSelector, createSelector } from '@ngrx/store';
import { matchFeatureKey } from '../reducers/match.reducer';
import { MatchState } from '../state/match-state';
import { map } from 'rxjs/operators';
import { MapItem } from 'src/app/models/map-item';
import { MapPipe } from 'src/app/pipes/map.pipe';

export const matchesFeatureState = createFeatureSelector<MatchState>(matchFeatureKey);

export const isLoadingSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.isLoading;
    }
);

export const matchListSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.allMatches;
    }
);

export const matchDetailsSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.matchDetails;
    }
);

export const filteredMatchListSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.filteredMatches;
    }
);

export const matchesMapsSelector = createSelector(
    matchListSelector,
    (matches) => {
        const mapPipe = new MapPipe();

        const allMaps = matches.map(x => x.map).filter((v, i, a) => a.indexOf(v) === i);

        const allMapsItems = allMaps.map(x => { return { friendlyName: mapPipe.transform(x), name: x } as MapItem });

        const result = allMapsItems.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));

        return result;
    }
);

export const filterSelector = createSelector(
    matchesFeatureState,
    (matches) => {
        return matches.filter;
    }
);

export const isDefaultfilterSelector = createSelector(
    filterSelector,
    (filter) => {
        return filter.isDefault;
    }
);

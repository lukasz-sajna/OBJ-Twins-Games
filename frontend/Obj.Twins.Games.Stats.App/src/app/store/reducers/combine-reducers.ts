import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { GlobalState } from '../state/global-state';
import { routerReducer } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

export const reducers: ActionReducerMap<GlobalState> = {
    router: routerReducer
};

export function logger(reducer: ActionReducer<GlobalState>): ActionReducer<GlobalState> {
    return (state, action) => {
        const result = reducer(state, action);

        console.groupCollapsed(action.type);
        console.log('prev state', state);
        console.log('action', action);
        console.log('next state', result);
        console.groupEnd();

        return result;
    };
}

export const metaReducers: MetaReducer<GlobalState>[] = !environment.production ? [logger] : [];

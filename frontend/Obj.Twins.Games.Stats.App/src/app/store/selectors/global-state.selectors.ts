import { createFeatureSelector } from '@ngrx/store';
import { GlobalState } from '../state/global-state';
import * as fromRouter from '@ngrx/router-store';

const selectRouter = createFeatureSelector<GlobalState, fromRouter.RouterReducerState<any>>('router');

export const selectUrlSelector = fromRouter.getSelectors(selectRouter).selectUrl;
export const selectRouteDataSelector = fromRouter.getSelectors(selectRouter).selectRouteData;
export const selectQueryParamsSelector = fromRouter.getSelectors(selectRouter).selectQueryParams;
export const selectRouteParamsSelector = fromRouter.getSelectors(selectRouter).selectRouteParams;

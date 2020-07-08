import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers/combine-reducers';
import { MaterialModule } from './shared/material.module';
import { PlayerStatsTableComponent } from './components/player-stats-table/player-stats-table.component';
import { HeaderComponent } from './containers/header/header.component';
import { PlayersStatsComponent } from './pages/players-stats/players-stats.component';
import { API_URL } from './injection-tokens';
import { HeaderEffects } from './store/effects/header.effects';
import { playerStatsReducer, statsFeatureKey } from './store/reducers/stats.reducer';
import { StatsEffects } from './store/effects/stats.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatchComponent } from './pages/match/match.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { MatchDetailsCardComponent } from './components/match-details-card/match-details-card.component';
import { MatchDetailsTableComponent } from './components/match-details-table/match-details-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerStatsTableComponent,
    PlayersStatsComponent,
    MatchComponent,
    MatchCardComponent,
    MatchDetailsComponent,
    MatchDetailsCardComponent,
    MatchDetailsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreModule.forFeature(statsFeatureKey, playerStatsReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    EffectsModule.forRoot([StatsEffects, HeaderEffects]),
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

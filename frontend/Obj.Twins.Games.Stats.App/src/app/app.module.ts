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
import { HttpClientModule } from '@angular/common/http';
import { MatchComponent } from './pages/match/match.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { TeamStatsComponent } from './pages/team-stats/team-stats.component';
import { TeamStatsTableComponent } from './components/team-stats-table/team-stats-table.component';
import { TeamsEffects } from './store/effects/teams.effects';
import { teamsFeatureKey, teamsReducer } from './store/reducers/teams.reducer';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { PlayersEffects } from './store/effects/players.effects';
import { playersFeatureKey, playersReducer } from './store/reducers/players.reducer';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { PlayerStatCardComponent } from './components/player-stat-card/player-stat-card.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule } from '@angular/forms';
import { MatchEffects } from './store/effects/match.effects';
import { matchFeatureKey, matchReducer } from './store/reducers/match.reducer';
import { MapPipe } from './pipes/map.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerStatsTableComponent,
    PlayersStatsComponent,
    MatchComponent,
    MatchCardComponent,
    MatchDetailsComponent,
    TeamStatsComponent,
    TeamStatsTableComponent,
    PlayerDetailsComponent,
    PlayerInfoComponent,
    PlayerStatsComponent,
    PlayerStatCardComponent,
    MapPipe,
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
    StoreModule.forFeature(matchFeatureKey, matchReducer),
    StoreModule.forFeature(teamsFeatureKey, teamsReducer),
    StoreModule.forFeature(playersFeatureKey, playersReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    EffectsModule.forRoot([MatchEffects, HeaderEffects, TeamsEffects, PlayersEffects]),
    MaterialModule,
    HttpClientModule,
    GoogleChartsModule.forRoot({ version: '49' }),
    FormsModule
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

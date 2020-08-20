import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MATCHES_ROUTE, EMPTY_ROUTE, ALL_REMAINING_ROUTES, PLAYERS_ROUTE, TEAMS_ROUTE} from './routes';
import { PlayersStatsComponent } from './pages/players-stats/players-stats.component';
import { MatchComponent } from './pages/match/match.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { TeamStatsComponent } from './pages/team-stats/team-stats.component';
import { PlayerDetailsComponent } from './pages/player-details/player-details.component';
import { TeamDetailsComponent } from './pages/team-details/team-details.component';


const routes: Routes = [
  {
    path: MATCHES_ROUTE, component: MatchComponent
  },
  {
    path: `${MATCHES_ROUTE}/:matchId`, component: MatchDetailsComponent
  },
  {
    path: PLAYERS_ROUTE, component: PlayersStatsComponent
  },
  {
    path: `${PLAYERS_ROUTE}/:playerId`, component: PlayerDetailsComponent
  },
  {
    path: TEAMS_ROUTE, component: TeamStatsComponent
  },
  {
    path: `${TEAMS_ROUTE}/:teamId`, component: TeamDetailsComponent
  },
  {
    path: EMPTY_ROUTE,
    redirectTo: MATCHES_ROUTE, pathMatch: 'full'
  },
  {
    path: ALL_REMAINING_ROUTES,
    redirectTo: MATCHES_ROUTE,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MATCHES_ROUTE, EMPTY_ROUTE, ALL_REMAINING_ROUTES, PLAYERS_STATS_ROUTE, MATCH_DETAILS_ROUTE } from './routes';
import { PlayersStatsComponent } from './pages/players-stats/players-stats.component';
import { MatchComponent } from './pages/match/match.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';


const routes: Routes = [
  {
    path: MATCHES_ROUTE, component: MatchComponent
  },
  {
    path: PLAYERS_STATS_ROUTE, component: PlayersStatsComponent
  },
  {
    path: `${MATCH_DETAILS_ROUTE}/:id`, component: MatchDetailsComponent
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

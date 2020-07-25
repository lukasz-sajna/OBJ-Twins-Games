import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Match } from 'src/app/models/match';
import { MapBackgroundService } from 'src/app/services/map-background.service';
import { TeamInMatch } from 'src/app/models/team-in-match';
import { MatchResult } from 'src/app/models/match-result.enum';
import { PlayerMatch } from 'src/app/models/player-match';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent {
  @Input()
  public match: PlayerMatch;

  @Input()
  public resultGlow: boolean;

  @Output()
  public clicked: EventEmitter<string> = new EventEmitter();

  public matchResult: typeof MatchResult = MatchResult;

  constructor(private backgroundService: MapBackgroundService) { }

  public get BackgroundUrl(): string {
    return this.backgroundService.getBackgroundUrl(this.match.map);
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }

  public get FirstTeam(): TeamInMatch {
    return this.match.teams[0];
  }

  public get SecondTeam(): TeamInMatch {
    return this.match.teams[1];
  }
}

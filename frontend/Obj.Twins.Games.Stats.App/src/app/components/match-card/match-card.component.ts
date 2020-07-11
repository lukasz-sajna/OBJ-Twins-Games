import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Match } from 'src/app/models/match';
import { MapBackgroundService } from 'src/app/services/map-background.service';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent {
  @Input()
  public match: Match;

  @Output()
  public clicked: EventEmitter<string> = new EventEmitter();

  constructor(private backgroundService: MapBackgroundService) { }

  public get BackgroundUrl(): string {
    return this.backgroundService.getBackgroundUrl(this.match.map);
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }

  public get FirstTeam(): Team {
    return this.match.teams[0];
  }

  public get SecondTeam(): Team {
    return this.match.teams[1];
  }
}

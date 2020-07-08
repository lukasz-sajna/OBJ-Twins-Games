import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Match } from 'src/app/models/match';
import { MapBackgroundService } from 'src/app/services/map-background.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent {
  @Input()
  public match: Match;

  @Output()
  public clicked: EventEmitter<number> = new EventEmitter();

  constructor(private backgroundService: MapBackgroundService) { }

  public get BackgroundUrl(): string {
    return this.backgroundService.getBackgroundUrl(this.match.map);
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }
}

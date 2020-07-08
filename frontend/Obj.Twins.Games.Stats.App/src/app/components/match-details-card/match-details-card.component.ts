import { Component, OnInit, Input } from '@angular/core';
import { MatchDetails } from 'src/app/models/match-details';

@Component({
  selector: 'app-match-details-card',
  templateUrl: './match-details-card.component.html',
  styleUrls: ['./match-details-card.component.scss']
})
export class MatchDetailsCardComponent implements OnInit {
  @Input()
  matchDetails: MatchDetails;

  constructor() { }

  ngOnInit(): void {
  }

  public flagUrl(flagCode: string): string {
    return `https://www.countryflags.io/${flagCode}/flat/64.png`;
  }

}

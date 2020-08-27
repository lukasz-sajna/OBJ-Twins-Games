import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-stat-card',
  templateUrl: './player-stat-card.component.html',
  styleUrls: ['./player-stat-card.component.scss']
})
export class PlayerStatCardComponent {
  @Input()
  public value: string;

  @Input()
  public text: string;

  @Input()
  public customContent = false;

}

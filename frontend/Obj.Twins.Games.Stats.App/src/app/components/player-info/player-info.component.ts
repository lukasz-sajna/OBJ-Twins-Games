import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SteamStatus } from 'src/app/models/steam-status.enum';
import { PlayerSteamStatus } from 'src/app/models/player-steam-status';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {
  @Input()
  public name: string = String();

  @Input()
  public avatar: string = String();

  @Input()
  public playerStatus: PlayerSteamStatus = { status: SteamStatus.Offline, lastOnline: new Date() };

  @Input()
  public isRefreshingStatus = true;

  @Output()
  public steamProfileClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public get GetStatus(): string {
    if (this.playerStatus) {
      return this.isRefreshingStatus ? String() : SteamStatus[this.playerStatus.status];
    }
  }

  public get ShowLastSeen(): boolean {
    return this.playerStatus.status !== SteamStatus.Offline;
  }

}

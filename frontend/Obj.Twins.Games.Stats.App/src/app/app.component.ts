import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Obj-Twins-Games-App';

  constructor(private signalRService: SignalRService) {
    this.signalRService.buildConnection();
    this.signalRService.startConnection();
  }
}

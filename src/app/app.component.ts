import { DatabaseService } from './services/database.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, public dbService: DatabaseService){

    this.platform.ready().then(() => {
      this.dbService.openDatabase();
    });
  }
}

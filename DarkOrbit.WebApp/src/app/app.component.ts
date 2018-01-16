import { Component } from '@angular/core';
import { Options } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  notificationOptions: Options = {
    timeOut: 2500,
    preventLastDuplicates: 'visible',
    showProgressBar: false
  };
}

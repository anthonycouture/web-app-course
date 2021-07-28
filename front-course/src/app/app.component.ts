import {Component} from '@angular/core';
import {SnackBarService} from "./shared/components/snack-bar/snack-bar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-course';

  constructor(private _snackBarService: SnackBarService) {
  }
}

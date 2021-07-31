import {Component} from '@angular/core';
import {SnackBarService} from "./shared/components/snack-bar/snack-bar.service";
import {SpinnerStoreService} from "./core/state/spinner-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-course';

  // @ts-ignore
  spinner: boolean = false;

  constructor(private _snackBarService: SnackBarService,
              private _spinnerStore: SpinnerStoreService) {
    // @ts-ignore
    this._spinnerStore.spinner$.subscribe(
      (data) => setTimeout(() => {
        this.spinner = data
      }, 0)
    );
  }


}

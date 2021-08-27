import {Component, OnInit} from '@angular/core';
import {SpinnerStoreService} from "./core/state/spinner-store.service";
import {SnackBarService} from "./core/snack-bar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-course';
  isSpinner: boolean;

  constructor(private _spinnerStore: SpinnerStoreService,
              private _snackBarService: SnackBarService) {
    this.isSpinner = false;
  }

  ngOnInit(): void {
    this._spinnerStore.spinner$.subscribe(
      (data) => setTimeout(() => {
        this.isSpinner = data
      }, 0)
    );

  }


}

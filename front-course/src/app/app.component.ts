import {Component, OnInit} from '@angular/core';
import {SpinnerStoreService} from "./core/state/spinner-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-course';
  isSpinner: boolean;

  constructor(private _spinnerStore: SpinnerStoreService) {

    this.isSpinner = false;


    this._spinnerStore.spinner$.subscribe(
      (data) => setTimeout(() => {
        this.isSpinner = data
      }, 0)
    );
  }

  ngOnInit(): void {

  }


}

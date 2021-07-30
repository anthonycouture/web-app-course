import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnackBarService} from "./shared/components/snack-bar/snack-bar.service";
import {Store} from "@ngrx/store";
import {selectEtatSpinner} from "./core/state/spinner/spinner.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'front-course';

  // @ts-ignore
  spinner: boolean = false;

  constructor(private _snackBarService: SnackBarService,
              private _store: Store) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // @ts-ignore
    this._store.select(selectEtatSpinner).subscribe(
      (data) => setTimeout(() => {
        this.spinner = data
      }, 0)
    );
  }


}

import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectMessages} from "../../../core/state/message/message.selector";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "./snack-bar-component/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _store: Store,
              private _snackBar: MatSnackBar) {
    // @ts-ignore
    this._store.select(selectMessages).subscribe(
      (data) => {
        this._snackBar.openFromComponent(
          SnackBarComponent,
          {
            duration: 2 * 1000,
            data: data
          }
        )
      }
    );
  }
}

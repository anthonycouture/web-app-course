import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../shared/components/snack-bar/snack-bar-component/snack-bar.component";
import {MessageStoreService} from "./state/message-store.service";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _messageStore: MessageStoreService,
              private _snackBar: MatSnackBar) {
    this._messageStore.message$.subscribe(
      (data) => {
        this._snackBar.openFromComponent(
          SnackBarComponent,
          {
            duration: 4 * 1000,
            data: data
          }
        )
      }
    );
  }
}

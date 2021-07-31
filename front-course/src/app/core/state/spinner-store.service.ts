import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerStoreService {

  private readonly _spinnerSource = new BehaviorSubject<boolean>(false);

  readonly spinner$ = this._spinnerSource.asObservable();


  constructor() {
  }

  setSpinner(etat: boolean): void {
    this._spinnerSource.next(etat);
  }
}

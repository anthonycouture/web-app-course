import {Injectable} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class UpdateApplication {

  constructor(private updates: SwUpdate) {

  }

  init(): void {
    this.updates.available.subscribe(() => {
      this.updates.activateUpdate().then(() => document.location.reload());

    });
  }
}

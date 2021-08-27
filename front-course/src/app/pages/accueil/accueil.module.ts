import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccueilComponent} from "./accueil.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: AccueilComponent
  }
];


@NgModule({
  declarations: [AccueilComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
  ],
  exports: []
})
export class AccueilModule {
}

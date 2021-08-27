import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListeCousePredefinedComponent} from "./liste-couse-predefined.component";
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: ListeCousePredefinedComponent
  }
];


@NgModule({
  declarations: [
    ListeCousePredefinedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ListeCoursePredefinedModule {
}

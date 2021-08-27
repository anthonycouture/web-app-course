import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GestionComponent} from "./gestion.component";
import {SharedModule} from "../../shared/shared.module";
import {ListGestionCategorieProduitComponent} from "./list-gestion-categorie-produit/list-gestion-categorie-produit.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTreeModule} from "@angular/material/tree";

const routes: Routes = [
  {
    path: '',
    component: GestionComponent
  }
];

@NgModule({
  declarations: [
    GestionComponent,
    ListGestionCategorieProduitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatTreeModule,
  ]
})
export class GestionModule {
}

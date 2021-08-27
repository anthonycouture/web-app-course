import {NgModule} from '@angular/core';
import {ListeCourseComponent} from "./components/liste-course/liste-course.component";
import {SearchAutocompleteComponent} from "./components/search-autocomplete/search-autocomplete.component";
import {SnackBarComponent} from "./components/snack-bar/snack-bar-component/snack-bar.component";
import {ToolbarMenuComponent} from "./components/toolbar-menu/toolbar-menu.component";
import {DialogAddProduitInListComponent} from "./dialog/dialog-add-produit-in-list/dialog-add-produit-in-list.component";
import {DialogCreateCategorieComponent} from "./dialog/dialog-create-categorie/dialog-create-categorie.component";
import {DialogCreateProduitComponent} from "./dialog/dialog-create-produit/dialog-create-produit.component";
import {DialogDeleteProduitComponent} from "./dialog/dialog-delete-produit/dialog-delete-produit.component";
import {DialogEditProduitComponent} from "./dialog/dialog-edit-produit/dialog-edit-produit.component";
import {DialogEditCategorieComponent} from "./dialog/dialog-edit-categorie/dialog-edit-categorie.component";
import {DialogDeleteCategorieComponent} from "./dialog/dialog-delete-categorie/dialog-delete-categorie.component";
import {CategoriesFiltreByNameProduitPipe} from "./pipes/categories-filtre-by-name-produit.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    ListeCourseComponent,
    SearchAutocompleteComponent,
    SnackBarComponent,
    ToolbarMenuComponent,
    DialogAddProduitInListComponent,
    DialogCreateCategorieComponent,
    DialogCreateProduitComponent,
    DialogDeleteProduitComponent,
    DialogDeleteCategorieComponent,
    DialogEditProduitComponent,
    DialogEditCategorieComponent,
    CategoriesFiltreByNameProduitPipe,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    MatAutocompleteModule,
    MatGridListModule
  ],
  exports: [
    ListeCourseComponent,
    SearchAutocompleteComponent,
    SnackBarComponent,
    ToolbarMenuComponent,
    DialogAddProduitInListComponent,
    DialogCreateCategorieComponent,
    DialogCreateProduitComponent,
    DialogDeleteProduitComponent,
    DialogDeleteCategorieComponent,
    DialogEditProduitComponent,
    DialogEditCategorieComponent,
    CategoriesFiltreByNameProduitPipe
  ]
})
export class SharedModule {
}

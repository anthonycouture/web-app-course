import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {StoreModule} from '@ngrx/store';
import {reducer} from './core/state/categorie.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from "@angular/material/button";
import {GestionComponent} from './pages/gestion/gestion.component';
import {ToolbarMenuComponent} from './shared/components/toolbar-menu/toolbar-menu.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchAutocompleteComponent} from './shared/components/search-autocomplete/search-autocomplete.component';
import {ListGestionCategorieProduitComponent} from './pages/gestion/list-gestion-categorie-produit/list-gestion-categorie-produit.component';
import {DialogDeleteCategorieComponent} from './pages/gestion/list-gestion-categorie-produit/dialog-delete-categorie/dialog-delete-categorie.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogEditCategorieComponent} from './pages/gestion/list-gestion-categorie-produit/dialog-edit-categorie/dialog-edit-categorie.component';
import {DialogDeleteProduitComponent} from './pages/gestion/list-gestion-categorie-produit/dialog-delete-produit/dialog-delete-produit.component';
import {SnackBarComponent} from './shared/components/snack-bar/snack-bar.component';
import {DialogEditProduitComponent} from './pages/gestion/list-gestion-categorie-produit/dialog-edit-produit/dialog-edit-produit.component';
import {MatSelectModule} from "@angular/material/select";

const routes = [
  {path: '', component: AccueilComponent},
  {path: 'gestion', component: GestionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    GestionComponent,
    ToolbarMenuComponent,
    SearchAutocompleteComponent,
    ListGestionCategorieProduitComponent,
    DialogDeleteCategorieComponent,
    DialogEditCategorieComponent,
    DialogDeleteProduitComponent,
    SnackBarComponent,
    DialogEditProduitComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.forRoot({categories: reducer}
    ),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: false}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

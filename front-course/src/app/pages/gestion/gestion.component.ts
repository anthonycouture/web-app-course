import {Component, OnInit} from '@angular/core';
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";
import {firstValueFrom, map, Observable} from "rxjs";
import {CategoriesStoreService} from "../../core/state/categories-store.service";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";
import {MessageStoreService} from "../../core/state/message-store.service";
import {DialogCreateCategorieComponent} from "../../shared/dialog/dialog-create-categorie/dialog-create-categorie.component";
import {DialogCreateProduitComponent} from "../../shared/dialog/dialog-create-produit/dialog-create-produit.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  categories$: Observable<Categorie[]>;

  listOption: string[];

  listNameProduit$: Observable<string[]>;

  messageError: string | undefined;

  constructor(private _categorieService: CategorieService,
              private _messageStore: MessageStoreService,
              private _categoriesStore: CategoriesStoreService,
              private _spinnerStore: SpinnerStoreService,
              private _dialog: MatDialog) {
    this.categories$ = this._categoriesStore.categories$;
    this.listNameProduit$ = this._categoriesStore.categories$.pipe(
      map((categories) => {
        let listOption: string [] = [];
        categories.forEach(categorie => {
          categorie.produits?.forEach(produit => listOption.push(produit.nom))
        });
        return listOption;
      })
    );
    this.listOption = [];
  }

  ngOnInit(): void {
    this._spinnerStore.setSpinner(true);
    firstValueFrom(this._categorieService.getCategories())
      .then((result) => this._categoriesStore.setCategories(result))
      .catch(() => this.messageError = 'Problème de communication avec le serveur')
      .finally(() => this._spinnerStore.setSpinner(false))
  }


  openDialogCreateCategorie(): void {
    this._dialog.open(DialogCreateCategorieComponent, {
      width: '350px',
    });
  }

  openDialogCreateProduit(): void {
    this._dialog.open(DialogCreateProduitComponent, {
      width: '350px',
    });
  }

}

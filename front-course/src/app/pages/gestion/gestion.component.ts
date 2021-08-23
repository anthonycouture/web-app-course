import {Component, OnInit} from '@angular/core';
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";
import {firstValueFrom} from "rxjs";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";
import {MessageStoreService} from "../../core/state/message-store.service";
import {DialogCreateCategorieComponent} from "../../shared/dialog/dialog-create-categorie/dialog-create-categorie.component";
import {DialogCreateProduitComponent} from "../../shared/dialog/dialog-create-produit/dialog-create-produit.component";
import {MatDialog} from "@angular/material/dialog";
import {Produit} from "../../core/models/produit";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  categories: Categorie[];

  listOption: string[];

  listNameProduit: string[];

  messageError: string | undefined;

  constructor(private _categorieService: CategorieService,
              private _messageStore: MessageStoreService,
              private _spinnerStore: SpinnerStoreService,
              private _dialog: MatDialog) {
    this.categories = [];
    this.listNameProduit = [];
    this.listOption = [];
  }

  ngOnInit(): void {
    this._spinnerStore.setSpinner(true);
    firstValueFrom(this._categorieService.getCategories())
      .then((categories) => {
        this.categories = categories;
        this._updateListOption();
      })
      .catch(() => this.messageError = 'Problème de communication avec le serveur')
      .finally(() => this._spinnerStore.setSpinner(false))
  }

  private _updateListOption() {
    this.listNameProduit = [];
    this.categories.forEach(categorie => {
      categorie.produits?.forEach(produit => this.listNameProduit.push(produit.nom))
    });
  }


  openDialogCreateCategorie(): void {
    const dialogRef = this._dialog.open(DialogCreateCategorieComponent, {
      width: '350px',
    });

    firstValueFrom(dialogRef.afterClosed()).then(result => {
      if (!!result && result !== false) {
        this.categories = [...this.categories, result]
      }
    });
  }

  openDialogCreateProduit(): void {
    const dialogRef = this._dialog.open(DialogCreateProduitComponent, {
      width: '350px',
      data: this.categories
    });

    firstValueFrom(dialogRef.afterClosed()).then(async result => {
      if (!!result && result !== false) {
        this.categories = await this.categories
          .map(categorie => {
            categorie.produits = categorie.produits.filter(item => item.id !== result.produit.id)
            if (categorie.id === result.idCategorie) {
              categorie.produits = [...categorie.produits, result.produit];
            }
            return categorie;
          });

        this._updateListOption();
      }
    });
  }


  deleteCategorie(idCategorie: number): void {
    this.categories = this.categories.filter(item => item.id !== idCategorie);
    this._updateListOption();
  }

  editCategorie(categorie: Categorie): void {
    this.deleteCategorie(categorie.id);
    this.categories.push(categorie);
  }

  deleteProduit(idProduit: number): void {
    this.categories = this.categories.map(categorie => {
      categorie.produits = categorie.produits.filter(item => item.id !== idProduit);
      return categorie;
    });
    this._updateListOption();
  }

  editProduit(editProduit: { produit: Produit, idCategorie: number }) {
    this.categories = this.categories.map(categorie => {
      categorie.produits = categorie.produits.filter(item => item.id !== editProduit.produit.id);
      if (categorie.id === editProduit.idCategorie) {
        categorie.produits = [...categorie.produits, editProduit.produit];
        return categorie;
      } else {
        return categorie;
      }
    });
    this._updateListOption();
  }

}

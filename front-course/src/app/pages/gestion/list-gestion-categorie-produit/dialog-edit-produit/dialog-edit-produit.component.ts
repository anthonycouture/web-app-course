import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Categorie} from "../../../../core/models/categorie";
import {selectCategories} from "../../../../core/state/categorie.selector";
import {Produit} from "../../../../core/models/produit";
import {updateProduitInList} from "../../../../core/state/categorie.action";
import {ProduitService} from "../../../../core/services/produit.service";

@Component({
  selector: 'app-dialog-edit-produit',
  templateUrl: './dialog-edit-produit.component.html',
  styleUrls: ['./dialog-edit-produit.component.css']
})
export class DialogEditProduitComponent implements OnInit {

  categories: Categorie[] = [];
  categorieSelected: Categorie | undefined;
  produit: Produit;

  constructor(
    private _dialogRef: MatDialogRef<DialogEditProduitComponent>,
    private _store: Store,
    private _produitService: ProduitService,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {
    this.produit = Object.assign({}, data);
  }

  ngOnInit(): void {
    // @ts-ignore
    this._store.select(selectCategories).subscribe(
      (data) => {
        this.categories = data;
        this.categorieSelected = data.filter(item => item.produits?.includes(this.data))[0];
      }
    );
  }


  edit(): void {
    if (this.categorieSelected !== undefined) {
      let categorie = this.categorieSelected;
      this._produitService.updateProduit(categorie.id, this.produit).subscribe(
        (data) => this._store.dispatch(updateProduitInList({idCategorie: categorie.id, produit: data})),
        (error) => console.error(error)
      );
    }
    this._dialogRef.close();
  }

  notEdit(): void {
    this._dialogRef.close();
  }

}

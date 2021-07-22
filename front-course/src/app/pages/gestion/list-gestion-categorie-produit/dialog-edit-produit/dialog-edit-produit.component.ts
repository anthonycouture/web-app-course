import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Categorie} from "../../../../core/models/categorie";
import {selectCategories} from "../../../../core/state/categorie.selector";
import {Produit} from "../../../../core/models/produit";
import {updateProduitInList} from "../../../../core/state/categorie.action";

@Component({
  selector: 'app-dialog-edit-produit',
  templateUrl: './dialog-edit-produit.component.html',
  styleUrls: ['./dialog-edit-produit.component.css']
})
export class DialogEditProduitComponent implements OnInit {

  categories: Categorie[] = [];
  categorieSelected: Categorie | undefined;

  constructor(
    private _dialogRef: MatDialogRef<DialogEditProduitComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {
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
    if (this.categorieSelected !== undefined)
      this._store.dispatch(updateProduitInList({categorie: this.categorieSelected, produit: this.data}));
    this._dialogRef.close();
  }

  notEdit(): void {
    this._dialogRef.close();
  }

}

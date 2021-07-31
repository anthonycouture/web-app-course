import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit.service";
import {addMessage} from "../../../core/state/message/message.action";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";

@Component({
  selector: 'app-dialog-delete-produit',
  templateUrl: './dialog-delete-produit.component.html',
  styleUrls: ['./dialog-delete-produit.component.css']
})
export class DialogDeleteProduitComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DialogDeleteProduitComponent>,
              private _store: Store,
              private _produitService: ProduitService,
              private _categoriesStore: CategoriesStoreService,
              @Inject(MAT_DIALOG_DATA) public data: Produit) {
  }

  ngOnInit(): void {
  }


  delete(): void {
    this._produitService.deleteProduit(this.data.id).subscribe(
      () => {
        this._categoriesStore.deleteProduitInCategorie(this.data.id);
        this._store.dispatch(addMessage({message: {message: 'Le produit a été supprimé', colorTexte: 'white'}}));
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 404:
            this._store.dispatch(addMessage({message: {message: 'Le produit n\'existe pas', colorTexte: 'red'}}));
            break;
          case 409:
            this._store.dispatch(addMessage({
              message: {
                message: 'Le produit est utilisé dans la liste de course',
                colorTexte: 'red'
              }
            }));
            break;
          default :
            this._store.dispatch(addMessage({
              message: {
                message: 'Une erreur est survenue lors de la suppression du produit',
                colorTexte: 'red'
              }
            }));
            break;
        }
      }
    )
  }

  notDelete(): void {
    this._dialogRef.close();
  }
}

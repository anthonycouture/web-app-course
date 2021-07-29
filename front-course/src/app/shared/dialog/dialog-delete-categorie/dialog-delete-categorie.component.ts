import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {Store} from "@ngrx/store";
import {deleteCategorieInList} from "../../../core/state/categorie/categories.action";
import {Categorie} from "../../../core/models/categorie";
import {addMessage} from "../../../core/state/message/message.action";

@Component({
  selector: 'app-dialog-delete-categorie',
  templateUrl: './dialog-delete-categorie.component.html',
  styleUrls: ['./dialog-delete-categorie.component.css']
})
export class DialogDeleteCategorieComponent implements OnInit {


  constructor(private _dialogRef: MatDialogRef<DialogDeleteCategorieComponent>,
              private _categorieService: CategorieService,
              private _store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this._categorieService.deleteCategorie(this.data.id).subscribe(
      () => {
        this._store.dispatch(deleteCategorieInList({idCategorie: this.data.id}));
        this._store.dispatch(addMessage({message: {message: 'La catégorie a été supprimé', colorTexte: 'white'}}));
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 404:
            this._store.dispatch(addMessage({message: {message: 'La catégorie n\'existe pas', colorTexte: 'red'}}));
            break;
          case 409:
            this._store.dispatch(addMessage({
              message: {
                message: 'La catégorie est utilisé dans la liste de course',
                colorTexte: 'red'
              }
            }));
            break;
          default :
            this._store.dispatch(addMessage({
              message: {
                message: 'Une erreur est survenue lors de la suppression de la catégorie',
                colorTexte: 'red'
              }
            }));
            break;
        }
      }
    );
  }

  notDelete(): void {
    this._dialogRef.close();
  }

}

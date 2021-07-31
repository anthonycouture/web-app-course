import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {Categorie} from "../../../core/models/categorie";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-delete-categorie',
  templateUrl: './dialog-delete-categorie.component.html',
  styleUrls: ['./dialog-delete-categorie.component.css']
})
export class DialogDeleteCategorieComponent implements OnInit {


  constructor(private _dialogRef: MatDialogRef<DialogDeleteCategorieComponent>,
              private _categorieService: CategorieService,
              private _messageStore: MessageStoreService,
              private _categoriesStore: CategoriesStoreService,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this._categorieService.deleteCategorie(this.data.id).subscribe(
      () => {
        this._categoriesStore.removeCategorie(this.data.id);
        this._messageStore.setMessage({message: 'La catégorie a été supprimé', colorTexte: 'white'});
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 404:
            this._messageStore.setMessage({message: 'La catégorie n\'existe pas', colorTexte: 'red'});
            break;
          case 409:
            this._messageStore.setMessage({
                message: 'La catégorie est utilisé dans la liste de course',
                colorTexte: 'red'
              }
            );
            break;
          default :
            this._messageStore.setMessage({
                message: 'Une erreur est survenue lors de la suppression de la catégorie',
                colorTexte: 'red'
              }
            );
            break;
        }
      }
    );
  }

  notDelete(): void {
    this._dialogRef.close();
  }

}

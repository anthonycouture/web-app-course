import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {Categorie} from "../../../core/models/categorie";
import {MessageStoreService} from "../../../core/state/message-store.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-dialog-delete-categorie',
  templateUrl: './dialog-delete-categorie.component.html',
  styleUrls: ['./dialog-delete-categorie.component.css']
})
export class DialogDeleteCategorieComponent implements OnInit {

  messageError: string | undefined = undefined;
  isSpinner: boolean = false;


  constructor(private _dialogRef: MatDialogRef<DialogDeleteCategorieComponent>,
              private _categorieService: CategorieService,
              private _messageStore: MessageStoreService,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.messageError = undefined;
    this.isSpinner = true;
    firstValueFrom(this._categorieService.deleteCategorie(this.data.id))
      .then(() => {
        this._messageStore.setMessage({message: 'La catégorie a été supprimé', colorTexte: 'white'});
        this._dialogRef.close(this.data.id);
      }).catch((error) => {
        switch (error.status) {
          case 404:
            this.messageError = 'La catégorie n\'existe pas';
            break;
          case 409:
            this.messageError = 'La catégorie est utilisé dans la liste de course';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de la suppression de la catégorie';
        }
      }
    ).finally(() => this.isSpinner = false);
  }

  notDelete(): void {
    this._dialogRef.close(false);
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit.service";
import {MessageStoreService} from "../../../core/state/message-store.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-dialog-delete-produit',
  templateUrl: './dialog-delete-produit.component.html',
  styleUrls: ['./dialog-delete-produit.component.css']
})
export class DialogDeleteProduitComponent implements OnInit {

  messageError: string | undefined = undefined;
  isSpinner: boolean = false;

  constructor(private _dialogRef: MatDialogRef<DialogDeleteProduitComponent>,
              private _messageStore: MessageStoreService,
              private _produitService: ProduitService,
              @Inject(MAT_DIALOG_DATA) public data: Produit) {
  }

  ngOnInit(): void {
  }


  delete(): void {
    this.messageError = undefined;
    this.isSpinner = true;
    firstValueFrom(this._produitService.deleteProduit(this.data.id))
      .then(() => {
        this._messageStore.setMessage({message: 'Le produit a été supprimé', colorTexte: 'white'});
        this._dialogRef.close(this.data.id);
      }).catch((error) => {
        switch (error.status) {
          case 404:
            this.messageError = 'Le produit n\'existe pas';
            break;
          case 409:
            this.messageError = 'Le produit est utilisé dans la liste de course';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de la suppression du produit';
        }
      }
    ).finally(() => this.isSpinner = false);
  }

  notDelete(): void {
    this._dialogRef.close(false);
  }
}

import {Component, Inject} from '@angular/core';
import {Categorie} from "../../../core/models/categorie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NameProduitExistValidator} from "../../validators/name-produit-exist-validator";
import {ProduitService} from "../../../core/services/produit.service";
import {firstValueFrom} from "rxjs";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-create-produit',
  templateUrl: './dialog-create-produit.component.html',
  styleUrls: ['./dialog-create-produit.component.css']
})
export class DialogCreateProduitComponent {

  messageError: string | undefined;
  isSpinner: boolean;

  categories: Categorie[];

  produitForm: FormGroup;

  get categorie(): Categorie {
    return this.produitForm.controls['categorie'].value
  }

  set categorie(categorie: Categorie) {
    this.produitForm.controls['categorie'].setValue(categorie);
  }

  get produitName(): string {
    return this.produitForm.controls['produitName'].value;
  }

  constructor(
    private _dialogRef: MatDialogRef<DialogCreateProduitComponent>,
    private _produitExistValidator: NameProduitExistValidator,
    private _formBuilder: FormBuilder,
    private _messageStore: MessageStoreService,
    private _produitService: ProduitService,
    @Inject(MAT_DIALOG_DATA) data: Categorie[]
  ) {
    this.categories = data.slice();
    this.isSpinner = false;
    this.produitForm = this._formBuilder.group({
      categorie: [undefined,
        {
          validators: Validators.required
        }
      ],
      produitName: ['',
        {
          validators: [Validators.required, this._produitExistValidator.validate(null, this.categories)]
        }
      ]
    });
  }

  create(): void {
    this.messageError = undefined;
    this.isSpinner = true;
    firstValueFrom(this._produitService.createProduit(this.categorie.id, this.produitName))
      .then((data) => {
        this._messageStore.setMessage({message: 'Le produit a ??t?? cr????', colorTexte: 'white'});
        this._dialogRef.close({produit: data, idCategorie: this.categorie.id});
      }).catch((error) => {
        switch (error.status) {
          case 409:
            this.messageError = 'Le produit existe d??j??';
            break;
          case 412:
            this.messageError = 'La cat??gorie n\'existe pas';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de la cr??ation du produit';
        }
      }
    ).finally(() => this.isSpinner = false)
  }

  notCreate(): void {
    this._dialogRef.close(false);
  }

}

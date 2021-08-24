import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Categorie} from "../../../core/models/categorie";
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NameProduitExistValidator} from "../../validators/name-produit-exist-validator";
import {firstValueFrom} from "rxjs";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-edit-produit',
  templateUrl: './dialog-edit-produit.component.html',
  styleUrls: ['./dialog-edit-produit.component.css']
})
export class DialogEditProduitComponent {

  messageError: string | undefined;
  isSpinner: boolean;

  categories: Categorie[];
  produit: Produit;

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
    private _dialogRef: MatDialogRef<DialogEditProduitComponent>,
    private _messageStore: MessageStoreService,
    private _produitService: ProduitService,
    private _formBuilder: FormBuilder,
    private _produitExistValidator: NameProduitExistValidator,
    @Inject(MAT_DIALOG_DATA) data: { produit: Produit, categories: Categorie[] }
  ) {
    this.categories = data.categories;
    this.produit = data.produit;
    this.isSpinner = false;
    this.produitForm = this._formBuilder.group({
      categorie: [undefined,
        {
          validators: Validators.required
        }
      ],
      produitName: [this.produit.nom,
        {
          validators: [Validators.required, this._produitExistValidator.validate(this.produit.id, this.categories)]
        }
      ]
    });
    this.categorie = data.categories.filter(item => item.produits.includes(data.produit))[0];
  }


  edit(): void {
    this.messageError = undefined;
    this.isSpinner = true;
    let produit: Produit = this.produit;
    produit.nom = this.produitName;
    firstValueFrom(this._produitService.updateProduit(this.categorie.id, produit))
      .then((data) => {
        this._messageStore.setMessage({message: 'Le produit a été mis à jour', colorTexte: 'white'});
        this._dialogRef.close({produit: data, idCategorie: this.categorie.id});
      }).catch((error) => {
        switch (error.status) {
          case 404:
            this.messageError = 'La produit n\'existe pas';
            break;
          case 412:
            this.messageError = 'La catégorie n\'existe pas';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de la modification du produit';
        }
      }
    ).finally(() => this.isSpinner = false);
  }

  notEdit(): void {
    this._dialogRef.close(false);
  }

}

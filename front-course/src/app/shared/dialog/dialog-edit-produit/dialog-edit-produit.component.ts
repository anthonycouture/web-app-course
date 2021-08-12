import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Categorie} from "../../../core/models/categorie";
import {Produit} from "../../../core/models/produit";
import {ProduitService} from "../../../core/services/produit.service";
import {FormBuilder, Validators} from "@angular/forms";
import {NameProduitExistValidator} from "../../validators/name-produit-exist-validator";
import {firstValueFrom, Observable} from "rxjs";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-edit-produit',
  templateUrl: './dialog-edit-produit.component.html',
  styleUrls: ['./dialog-edit-produit.component.css']
})
export class DialogEditProduitComponent {

  messageError: string | undefined = undefined;
  isSpinner: boolean = false;

  categories$: Observable<Categorie[]> = this._categoriesStore.categories$;

  produitForm = this._formBuilder.group({
    categorie: [undefined,
      {
        validators: Validators.required
      }
    ],
    produitName: [this.data.nom,
      {
        validators: [Validators.required, this._produitExistValidator.validate(this.data.id)]
      }
    ]
  });

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
    private _categoriesStore: CategoriesStoreService,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {
    this.categorie = this._categoriesStore.getCategories().filter(item => item.produits?.includes(this.data))[0];
  }


  edit(): void {
    this.messageError = undefined;
    this.isSpinner = true;
    let produit: Produit = Object.assign({}, this.data);
    produit.nom = this.produitName;
    firstValueFrom(this._produitService.updateProduit(this.categorie.id, produit))
      .then((data) => {
        this._categoriesStore.updateProduitInCategorie(this.categorie.id, data);
        this._messageStore.setMessage({message: 'Le produit a été mis à jour', colorTexte: 'white'});
        this._dialogRef.close();
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
            break;
        }
      }
    ).finally(() => this.isSpinner = false);
  }

  notEdit(): void {
    this._dialogRef.close();
  }

}

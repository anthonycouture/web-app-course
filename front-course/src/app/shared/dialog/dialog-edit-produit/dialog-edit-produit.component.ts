import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Categorie} from "../../../core/models/categorie";
import {selectCategories} from "../../../core/state/categorie/categories.selector";
import {Produit} from "../../../core/models/produit";
import {updateProduitInList} from "../../../core/state/categorie/categories.action";
import {ProduitService} from "../../../core/services/produit.service";
import {FormBuilder, Validators} from "@angular/forms";
import {NameProduitExistValidator} from "../../validators/name-produit-exist-validator";
import {addMessage} from "../../../core/state/message/message.action";

@Component({
  selector: 'app-dialog-edit-produit',
  templateUrl: './dialog-edit-produit.component.html',
  styleUrls: ['./dialog-edit-produit.component.css']
})
export class DialogEditProduitComponent {

  categories: Categorie[] = [];

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
    private _store: Store,
    private _produitService: ProduitService,
    private _formBuilder: FormBuilder,
    private _produitExistValidator: NameProduitExistValidator,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {
    // @ts-ignore
    this._store.select(selectCategories).subscribe(
      (data) => {
        this.categories = data;
        this.categorie = data.filter(item => item.produits?.includes(this.data))[0];
      }
    );
  }


  edit(): void {
    let produit: Produit = Object.assign({}, this.data);
    produit.nom = this.produitName;
    this._produitService.updateProduit(this.categorie.id, produit).subscribe(
      (data) => {
        this._store.dispatch(updateProduitInList({idCategorie: this.categorie.id, produit: data}));
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 404:
            this._store.dispatch(addMessage({message: {message: 'La produit n\'existe pas', colorTexte: 'red'}}));
            break;
          case 412:
            this._store.dispatch(addMessage({message: {message: 'La catégorie n\'existe pas', colorTexte: 'red'}}));
            break;
          default :
            this._store.dispatch(addMessage({
              message: {
                message: 'Une erreur est survenue lors de la modification du produit',
                colorTexte: 'red'
              }
            }));
            break;
        }
      }
    );
  }

  notEdit(): void {
    this._dialogRef.close();
  }

}

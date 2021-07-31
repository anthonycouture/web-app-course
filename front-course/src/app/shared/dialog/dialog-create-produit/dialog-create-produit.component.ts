import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../../core/models/categorie";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NameProduitExistValidator} from "../../validators/name-produit-exist-validator";
import {ProduitService} from "../../../core/services/produit.service";
import {Observable} from "rxjs";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-create-produit',
  templateUrl: './dialog-create-produit.component.html',
  styleUrls: ['./dialog-create-produit.component.css']
})
export class DialogCreateProduitComponent implements OnInit {

  // @ts-ignore
  categories$: Observable<Categorie[]> = this._categoriesStore.categories$;

  produitForm = this._formBuilder.group({
    categorie: [undefined,
      {
        validators: Validators.required
      }
    ],
    produitName: ['',
      {
        validators: [Validators.required, this._produitExistValidator.validate(null)]
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
    private _dialogRef: MatDialogRef<DialogCreateProduitComponent>,
    private _produitExistValidator: NameProduitExistValidator,
    private _formBuilder: FormBuilder,
    private _messageStore: MessageStoreService,
    private _produitService: ProduitService,
    private _categoriesStore: CategoriesStoreService
  ) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this._produitService.createProduit(this.categorie.id, this.produitName).subscribe(
      (data) => {
        this._categoriesStore.addProduitInCategorie(this.categorie.id, data);
        this._messageStore.setMessage({message: 'Le produit a été créé', colorTexte: 'white'});
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 409:
            this._messageStore.setMessage({message: 'Le produit existe déjà', colorTexte: 'red'});
            break;
          case 412:
            this._messageStore.setMessage({message: 'La catégorie n\'existe pas', colorTexte: 'red'});
            break;
          default :
            this._messageStore.setMessage({
                message: 'Une erreur est survenue lors de la création du produit',
                colorTexte: 'red'
              }
            );
            break;
        }
      }
    )
  }

  notCreate(): void {
    this._dialogRef.close();
  }

}

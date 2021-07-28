import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../../core/models/categorie";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NameProduitExistValidator} from "../../validators/name-produit-exist-validator";
import {addProduitInList} from "../../../core/state/categorie.action";
import {selectCategories} from "../../../core/state/categorie.selector";
import {Store} from "@ngrx/store";
import {ProduitService} from "../../../core/services/produit.service";

@Component({
  selector: 'app-dialog-create-produit',
  templateUrl: './dialog-create-produit.component.html',
  styleUrls: ['./dialog-create-produit.component.css']
})
export class DialogCreateProduitComponent implements OnInit {

  categories: Categorie[] = [];

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
    private _store: Store,
    private _produitService: ProduitService,
  ) {
    // @ts-ignore
    this._store.select(selectCategories).subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  ngOnInit(): void {
  }

  create(): void {
    this._produitService.createProduit(this.categorie.id, this.produitName).subscribe(
      (data) => this._store.dispatch(addProduitInList({idCategorie: this.categorie.id, produit: data})),
      (error) => console.error(error)
    )
    this._dialogRef.close();
  }

  notCreate(): void {
    this._dialogRef.close();
  }

}

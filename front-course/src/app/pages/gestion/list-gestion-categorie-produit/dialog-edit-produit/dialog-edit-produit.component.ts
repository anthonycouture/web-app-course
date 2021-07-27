import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Categorie} from "../../../../core/models/categorie";
import {selectCategories} from "../../../../core/state/categorie.selector";
import {Produit} from "../../../../core/models/produit";
import {updateProduitInList} from "../../../../core/state/categorie.action";
import {ProduitService} from "../../../../core/services/produit.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ProduitExistValidator} from "../../../../shared/validators/produit-exist-validator";

@Component({
  selector: 'app-dialog-edit-produit',
  templateUrl: './dialog-edit-produit.component.html',
  styleUrls: ['./dialog-edit-produit.component.css']
})
export class DialogEditProduitComponent implements OnInit {

  categories: Categorie[] = [];

  produitForm = this._formBuilder.group({
    categorie: [undefined, Validators.required],
    produitName: [this.data.nom,
      {
        validators: [Validators.required],
        asyncValidators: [this._produitExistValidator],
        updateOn: 'blur'
      }
    ]
  });

  constructor(
    private _dialogRef: MatDialogRef<DialogEditProduitComponent>,
    private _store: Store,
    private _produitService: ProduitService,
    private _formBuilder: FormBuilder,
    private _produitExistValidator: ProduitExistValidator,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this._store.select(selectCategories).subscribe(
      (data) => {
        this.categories = data;
        this.produitForm.controls['categorie'].setValue(data.filter(item => item.produits?.includes(this.data))[0]);
      }
    );
  }


  edit(): void {
    console.log(this.produitForm.status)
    let produit: Produit = Object.assign({}, this.data);
    produit.nom = this.produitForm.controls['produitName'].value;
    let categorie: Categorie = this.produitForm.controls['categorie'].value;
    this._produitService.updateProduit(categorie.id, produit).subscribe(
      (data) => this._store.dispatch(updateProduitInList({idCategorie: categorie.id, produit: data})),
      (error) => console.error(error)
    );
    this._dialogRef.close();
  }

  notEdit(): void {
    this._dialogRef.close();
  }

}

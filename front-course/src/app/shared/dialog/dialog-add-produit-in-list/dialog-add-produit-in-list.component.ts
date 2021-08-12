import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../core/models/categorie";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {Produit} from "../../../core/models/produit";

@Component({
  selector: 'app-dialog-add-produit-in-list',
  templateUrl: './dialog-add-produit-in-list.component.html',
  styleUrls: ['./dialog-add-produit-in-list.component.css']
})
export class DialogAddProduitInListComponent implements OnInit {

  messageError: string | undefined;
  isSpinner: boolean;

  categories: Categorie[];
  produits: Produit[];

  produitForm: FormGroup;

  constructor(private _dialogRef: MatDialogRef<DialogAddProduitInListComponent>,
              private _formBuilder: FormBuilder,
              private _categoriesStore: CategoriesStoreService) {
    this.messageError = undefined;
    this.isSpinner = false;
    this.categories = this._categoriesStore.getCategories();
    this.produits = [];


    this.produitForm = this._formBuilder.group({
      categorie: ['',
        {
          validators: Validators.required
        }
      ],
      produit: ['',
        {
          validators: Validators.required
        }
      ],
      quantite: [1,
        {
          validators: [Validators.required, Validators.min(1)]
        }
      ]
    });

  }

  ngOnInit(): void {
    this.categories.forEach((categorie) =>
      categorie.produits?.forEach((produit) => this.produits.push(produit))
    );

    this.produitForm.valueChanges.subscribe((form) => {
      if (form.produit !== '') {
        this._categoriesStore.getCategories().every((categorie) => {
          return categorie.produits?.every((produit) => {
            if (produit.id === form.produit.id) {
              if (this.produitForm.controls['categorie'].value === '' || this.produitForm.controls['categorie'].value.id !== categorie.id)
                this.produitForm.controls['categorie'].setValue(categorie);
              return false;
            }
            return true;
          });
        });
      }
    });
  }

  addProduitInList(): void {
    this._dialogRef.close();
  }

  notAddProduitInList(): void {
    this._dialogRef.close();
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../core/models/categorie";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {Produit} from "../../../core/models/produit";
import {firstValueFrom, Subscription} from "rxjs";
import {CourseService} from "../../../core/services/course.service";
import {CourseStoreService} from "../../../core/state/course-store.service";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-add-produit-in-list',
  templateUrl: './dialog-add-produit-in-list.component.html',
  styleUrls: ['./dialog-add-produit-in-list.component.css']
})
export class DialogAddProduitInListComponent implements OnInit, OnDestroy {

  messageError: string | undefined;
  isSpinner: boolean;

  categories: Categorie[];
  produitsDisplay: Produit[];

  private _allProduits: Produit[];
  private _categorieSelected: Categorie | null;
  private _produitSelected: Produit | null;
  private _subcribes: Subscription[];

  produitForm: FormGroup;

  constructor(private _dialogRef: MatDialogRef<DialogAddProduitInListComponent>,
              private _formBuilder: FormBuilder,
              private _courseService: CourseService,
              private _categoriesStore: CategoriesStoreService,
              private _courseStore: CourseStoreService,
              private _messageStore: MessageStoreService) {
    this.isSpinner = false;
    this.categories = this._categoriesStore.getCategories();
    this.produitsDisplay = [];
    this._allProduits = [];
    this._categorieSelected = null;
    this._produitSelected = null;
    this._subcribes = [];


    this.produitForm = this._formBuilder.group({
      categorie: [this._categorieSelected,
        {
          validators: Validators.required
        }
      ],
      produit: [this._produitSelected,
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

  get categorie(): Categorie {
    return this.produitForm.controls['categorie'].value
  }

  set categorie(categorie: Categorie) {
    this.produitForm.controls['categorie'].setValue(categorie);
  }

  get produit(): Produit | null {
    return this.produitForm.controls['produit'].value;
  }

  set produit(produit: Produit | null) {
    this.produitForm.controls['produit'].setValue(produit);
  }

  get quantite(): number {
    return this.produitForm.controls['quantite'].value;
  }

  ngOnInit(): void {
    this.categories.forEach((categorie) =>
      categorie.produits?.forEach((produit) => {
        this.produitsDisplay.push(produit);
        this._allProduits.push(produit);
      })
    );

    this._subcribes.push(this.produitForm.valueChanges.subscribe((form) => {
      if (!!form.categorie && form.categorie !== this._categorieSelected) {
        const categorie: Categorie = this._categoriesStore.getCategories().filter(categorie => categorie.id === form.categorie.id)[0];
        this.produitsDisplay = categorie.produits ?? [];
        this._categorieSelected = categorie;
        if (!!this._produitSelected && !this.produitsDisplay.includes(this._produitSelected)) {
          this._produitSelected = null;
          this.produit = null;
        }
      } else if (!form.categorie && form.categorie !== this._categorieSelected) {
        this.produitsDisplay = this._allProduits;
        this._produitSelected = null;
        this._categorieSelected = null;
        this.produit = null;
      } else if (!!form.produit && form.produit !== this._produitSelected) {
        this._categoriesStore.getCategories().every((categorie) => {
          return categorie.produits?.every((produit) => {
            if (produit.id === form.produit.id) {
              this._produitSelected = produit;
              this.categorie = categorie;
              return false;
            }
            return true;
          });
        });
      } else if (!form.produit && form.produit !== this._produitSelected) {
        this._produitSelected = null;
      }
    }));
  }

  addProduitInList(): void {
    this.isSpinner = true;
    if (!this.produit) {
      this.messageError = 'Le produit n\'existe pas';
    } else {
      firstValueFrom(this._courseService.addItemCourseInList({
        idProduit: this.produit.id,
        quantite: this.quantite
      })).then((data) => {
        this._courseStore.addItemInCourse(data);
        this._messageStore.setMessage({
          message: 'Le produit a été ajouté à la liste de course',
          colorTexte: "white"
        });
        this._dialogRef.close();
      }).catch((error) => {
        switch (error.status) {
          case 404:
            this.messageError = 'Le produit n\'existe pas';
            break;
          case 409:
            this.messageError = 'La produit est déjà dans la liste de course';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de l\'ajout de produit dans la liste de course';
            break;
        }
      }).finally(() => this.isSpinner = false)
    }
  }

  notAddProduitInList(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this._subcribes.forEach(subcribe => subcribe.unsubscribe());
  }


}

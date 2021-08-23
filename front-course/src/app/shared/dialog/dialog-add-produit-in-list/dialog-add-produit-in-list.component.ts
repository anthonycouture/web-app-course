import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../../core/models/categorie";
import {Produit} from "../../../core/models/produit";
import {firstValueFrom, Subscription} from "rxjs";
import {CourseService} from "../../../core/services/course.service";
import {MessageStoreService} from "../../../core/state/message-store.service";
import {PreDefinedCourseService} from "../../../core/services/pre-defined-course.service";

interface DataInputAddProduitInList {
  categories: Categorie[];
  listType: 'list' | 'pre-list';
}

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

  listType: 'list' | 'pre-list';

  private _allProduits: Produit[];
  private _categorieSelected: Categorie | null;
  private _produitSelected: Produit | null;
  private _subcribes: Subscription[];

  produitForm: FormGroup;

  constructor(private _dialogRef: MatDialogRef<DialogAddProduitInListComponent>,
              private _formBuilder: FormBuilder,
              private _courseService: CourseService,
              private _preDefinedCourseService: PreDefinedCourseService,
              private _messageStore: MessageStoreService,
              @Inject(MAT_DIALOG_DATA) data: DataInputAddProduitInList) {
    this.isSpinner = false;
    this.categories = data.categories;
    this.listType = data.listType;
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
      categorie.produits.forEach((produit) => {
        this.produitsDisplay.push(produit);
        this._allProduits.push(produit);
      })
    );

    this._subcribes.push(this.produitForm.valueChanges.subscribe((form) => {
      if (!!form.categorie && form.categorie !== this._categorieSelected) {
        const categorie: Categorie = this.categories.filter(categorie => categorie.id === form.categorie.id)[0];
        this.produitsDisplay = categorie.produits;
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
        this.categories.every((categorie) => {
          return categorie.produits.every((produit) => {
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
    if (!this.produit) {
      this.messageError = 'Le produit n\'existe pas';
    } else {
      this.isSpinner = true;
      if (this.listType === 'list') {
        firstValueFrom(this._courseService.createItemCourseInList({
          idProduit: this.produit.id,
          quantite: this.quantite
        })).then((data) => {
          this._messageStore.setMessage({
            message: 'Le produit a été ajouté à la liste de course',
            colorTexte: "white"
          });
          this._dialogRef.close(data);
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
      } else if (this.listType === 'pre-list') {
        firstValueFrom(this._preDefinedCourseService.createItemCourseInPreDefinedListe({
          idProduit: this.produit.id,
          quantite: this.quantite
        })).then((data) => {
          this._messageStore.setMessage({
            message: 'Le produit a été ajouté à la liste de course pré définie',
            colorTexte: "white"
          });
          this._dialogRef.close(data);
        }).catch((error) => {
          switch (error.status) {
            case 404:
              this.messageError = 'Le produit n\'existe pas';
              break;
            case 409:
              this.messageError = 'La produit est déjà dans la liste de course pré définie';
              break;
            default :
              this.messageError = 'Une erreur est survenue lors de l\'ajout de produit dans la liste de course pré définie';
              break;
          }
        }).finally(() => this.isSpinner = false)
      } else {
        this.isSpinner = false
        this.messageError = 'Une erreur est survenue';
      }
    }
  }

  notAddProduitInList(): void {
    this._dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this._subcribes.forEach(subcribe => subcribe.unsubscribe());
  }


}

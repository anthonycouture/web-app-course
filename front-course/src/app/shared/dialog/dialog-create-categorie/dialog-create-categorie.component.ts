import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NameCategorieExistValidator} from "../../validators/name-categorie-exist-validator";
import {CategorieService} from "../../../core/services/categorie.service";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-dialog-create-categorie',
  templateUrl: './dialog-create-categorie.component.html',
  styleUrls: ['./dialog-create-categorie.component.css']
})
export class DialogCreateCategorieComponent implements OnInit {


  categorieName = new FormControl('', [Validators.required, this._nameCategorieExistValidator.validate(null)]);

  constructor(private _dialogRef: MatDialogRef<DialogCreateCategorieComponent>,
              private _nameCategorieExistValidator: NameCategorieExistValidator,
              private _messageStore: MessageStoreService,
              private _categorieService: CategorieService,
              private _categoriesStore: CategoriesStoreService) {
  }

  ngOnInit(): void {
  }

  create() {
    this._categorieService.createCategorie(this.categorieName.value).subscribe(
      (data) => {
        this._categoriesStore.addCategories(data);
        this._messageStore.setMessage({message: 'La catégorie a été créée', colorTexte: 'white'});
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 409:
            this._messageStore.setMessage({message: 'La catégorie existe déjà', colorTexte: 'red'});
            break;
          default :
            this._messageStore.setMessage({
                message: 'Une erreur est survenue lors de la création de la catégorie',
                colorTexte: 'red'
              }
            );
            break;
        }
      }
    )
  }

  notCreate() {
    this._dialogRef.close();
  }

}

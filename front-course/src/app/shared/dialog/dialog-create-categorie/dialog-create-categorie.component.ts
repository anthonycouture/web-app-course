import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NameCategorieExistValidator} from "../../validators/name-categorie-exist-validator";
import {CategorieService} from "../../../core/services/categorie.service";
import {addCategorieInList} from "../../../core/state/categorie/categories.action";
import {Store} from "@ngrx/store";
import {addMessage} from "../../../core/state/message/message.action";

@Component({
  selector: 'app-dialog-create-categorie',
  templateUrl: './dialog-create-categorie.component.html',
  styleUrls: ['./dialog-create-categorie.component.css']
})
export class DialogCreateCategorieComponent implements OnInit {


  categorieName = new FormControl('', [Validators.required, this._nameCategorieExistValidator.validate(null)]);

  constructor(private _dialogRef: MatDialogRef<DialogCreateCategorieComponent>,
              private _nameCategorieExistValidator: NameCategorieExistValidator,
              private _store: Store,
              private _categorieService: CategorieService) {
  }

  ngOnInit(): void {
  }

  create() {
    this._categorieService.createCategorie(this.categorieName.value).subscribe(
      (data) => {
        this._store.dispatch(addCategorieInList({categorie: data}));
        this._store.dispatch(addMessage({message: {message: 'La catégorie a été créée', colorTexte: 'white'}}));
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 409:
            this._store.dispatch(addMessage({message: {message: 'La catégorie existe déjà', colorTexte: 'red'}}));
            break;
          default :
            this._store.dispatch(addMessage({
              message: {
                message: 'Une erreur est survenue lors de la création de la catégorie',
                colorTexte: 'red'
              }
            }));
            break;
        }
      }
    )
  }

  notCreate() {
    this._dialogRef.close();
  }

}

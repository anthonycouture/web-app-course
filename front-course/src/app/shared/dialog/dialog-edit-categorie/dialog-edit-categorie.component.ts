import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {Categorie} from "../../../core/models/categorie";
import {Store} from "@ngrx/store";
import {updateCategorieInList} from "../../../core/state/categorie/categories.action";
import {FormControl, Validators} from "@angular/forms";
import {NameCategorieExistValidator} from "../../validators/name-categorie-exist-validator";
import {addMessage} from "../../../core/state/message/message.action";


@Component({
  selector: 'app-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.css']
})
export class DialogEditCategorieComponent implements OnInit {


  categorieName = new FormControl(this.data.nom, [Validators.required, this._nameCategorieExistValidator.validate(this.data.id)]);

  constructor(private _dialogRef: MatDialogRef<DialogEditCategorieComponent>,
              private _categorieService: CategorieService,
              private _store: Store,
              private _nameCategorieExistValidator: NameCategorieExistValidator,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
  }

  ngOnInit(): void {
  }

  edit(): void {
    let categorie = Object.assign({}, this.data);
    categorie.nom = this.categorieName.value;
    this._categorieService.editCategorie(categorie).subscribe(
      (data) => {
        this._store.dispatch(updateCategorieInList({categorie: data}));
        this._dialogRef.close();
      },
      (error) => {
        switch (error.status) {
          case 404:
            this._store.dispatch(addMessage({message: {message: 'La catégorie n\'existe pas', colorTexte: 'red'}}));
            break;
          default :
            this._store.dispatch(addMessage({
              message: {
                message: 'Une erreur est survenue lors de la modification de la catégorie',
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

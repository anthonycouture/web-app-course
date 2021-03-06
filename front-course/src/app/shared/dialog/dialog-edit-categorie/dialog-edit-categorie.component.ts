import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {Categorie} from "../../../core/models/categorie";
import {FormControl, Validators} from "@angular/forms";
import {NameCategorieExistValidator} from "../../validators/name-categorie-exist-validator";
import {MessageStoreService} from "../../../core/state/message-store.service";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.css']
})
export class DialogEditCategorieComponent implements OnInit {

  messageError: string | undefined;
  isSpinner: boolean;
  categories: Categorie[];


  categorieName: FormControl;

  constructor(private _dialogRef: MatDialogRef<DialogEditCategorieComponent>,
              private _categorieService: CategorieService,
              private _messageStore: MessageStoreService,
              private _nameCategorieExistValidator: NameCategorieExistValidator,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
    this.categories = [];
    this.isSpinner = false;
    this.categorieName = new FormControl(this.data.nom, [Validators.required, this._nameCategorieExistValidator.validate(this.data.id, this.categories)]);
  }

  ngOnInit(): void {
    firstValueFrom(this._categorieService.getCategories()).then((data) => this.categories = data);
  }

  edit(): void {
    this.messageError = undefined;
    this.isSpinner = true;
    let categorie = Object.assign({}, this.data);
    categorie.nom = this.categorieName.value;
    firstValueFrom(this._categorieService.editCategorie(categorie))
      .then((data) => {
        this._messageStore.setMessage({message: 'La catégorie a été mis à jour', colorTexte: 'white'});
        this._dialogRef.close(data);
      }).catch((error) => {
        switch (error.status) {
          case 404:
            this.messageError = 'La catégorie n\'existe pas';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de la modification de la catégorie';
        }
      }
    ).finally(() => this.isSpinner = false);
  }

  notEdit(): void {
    this._dialogRef.close(false);
  }

}

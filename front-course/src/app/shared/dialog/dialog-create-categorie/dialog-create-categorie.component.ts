import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NameCategorieExistValidator} from "../../validators/name-categorie-exist-validator";
import {CategorieService} from "../../../core/services/categorie.service";
import {MessageStoreService} from "../../../core/state/message-store.service";
import {firstValueFrom} from "rxjs";
import {Categorie} from "../../../core/models/categorie";

@Component({
  selector: 'app-dialog-create-categorie',
  templateUrl: './dialog-create-categorie.component.html',
  styleUrls: ['./dialog-create-categorie.component.css']
})
export class DialogCreateCategorieComponent implements OnInit {

  messageError: string | undefined;
  isSpinner: boolean;
  categories: Categorie[];


  categorieName: FormControl;

  constructor(private _dialogRef: MatDialogRef<DialogCreateCategorieComponent>,
              private _nameCategorieExistValidator: NameCategorieExistValidator,
              private _messageStore: MessageStoreService,
              private _categorieService: CategorieService) {
    this.categories = [];
    this.isSpinner = false;
    this.categorieName = new FormControl('', [Validators.required, this._nameCategorieExistValidator.validate(null, this.categories)]);
  }

  ngOnInit(): void {
    firstValueFrom(this._categorieService.getCategories()).then((data) => this.categories = data);
  }

  create() {
    this.messageError = undefined;
    this.isSpinner = true;
    firstValueFrom(this._categorieService.createCategorie(this.categorieName.value))
      .then((data) => {
        this._messageStore.setMessage({message: 'La catégorie a été créée', colorTexte: 'white'});
        this._dialogRef.close(data);
      }).catch((error) => {
        switch (error.status) {
          case 409:
            this.messageError = 'La catégorie existe déjà';
            break;
          default :
            this.messageError = 'Une erreur est survenue lors de la création de la catégorie';
            break;
        }
      }
    ).finally(() => this.isSpinner = false)
  }

  notCreate() {
    this._dialogRef.close(false);
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NameCategorieExistValidator} from "../../validators/name-categorie-exist-validator";
import {CategorieService} from "../../../core/services/categorie.service";
import {addCategorieInList} from "../../../core/state/categorie.action";
import {Store} from "@ngrx/store";

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
      (data) => this._store.dispatch(addCategorieInList({categorie: data})),
      (error) => console.error(error)
    )
    this._dialogRef.close();
  }

  notCreate() {
    this._dialogRef.close();
  }

}

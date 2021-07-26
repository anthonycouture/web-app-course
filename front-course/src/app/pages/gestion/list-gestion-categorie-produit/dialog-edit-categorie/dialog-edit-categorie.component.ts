import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../../core/services/categorie.service";
import {Categorie} from "../../../../core/models/categorie";
import {Store} from "@ngrx/store";
import {updateCategorieInList} from "../../../../core/state/categorie.action";
import {FormBuilder, FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.css']
})
export class DialogEditCategorieComponent implements OnInit {


  categorieName = new FormControl('',
    [Validators.required, Validators.minLength(2)]);

  constructor(private _dialogRef: MatDialogRef<DialogEditCategorieComponent>,
              private _categorieService: CategorieService,
              private _store: Store,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
    this.categorieName.setValue(this.data.nom);
  }

  ngOnInit(): void {
  }

  edit(): void {
    let categorie = Object.assign({}, this.data);
    categorie.nom = this.categorieName.value;
    this._categorieService.editCategorie(categorie).subscribe(
      () => this._store.dispatch(updateCategorieInList({categorie: categorie})),
      (error) => console.error(error)
    );
    this._dialogRef.close();
  }

  notEdit(): void {
    this._dialogRef.close();
  }

}

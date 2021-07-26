import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../../core/services/categorie.service";
import {Categorie} from "../../../../core/models/categorie";
import {Store} from "@ngrx/store";
import {updateCategorieInList} from "../../../../core/state/categorie.action";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.css']
})
export class DialogEditCategorieComponent implements OnInit {


  categorieName = new FormControl(this.data.nom,
    [Validators.required, Validators.minLength(2)]);

  constructor(private _dialogRef: MatDialogRef<DialogEditCategorieComponent>,
              private _categorieService: CategorieService,
              private _store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
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

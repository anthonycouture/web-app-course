import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../../core/services/categorie.service";
import {Store} from "@ngrx/store";
import {deleteCategorieInList} from "../../../../core/state/categorie.action";
import {Categorie} from "../../../../core/models/categorie";

@Component({
  selector: 'app-dialog-delete-categorie',
  templateUrl: './dialog-delete-categorie.component.html',
  styleUrls: ['./dialog-delete-categorie.component.css']
})
export class DialogDeleteCategorieComponent implements OnInit {


  constructor(private _dialogRef: MatDialogRef<DialogDeleteCategorieComponent>,
              private _categorieService: CategorieService,
              private _store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this._categorieService.deleteCategorie(this.data.id).subscribe(
      () => this._store.dispatch(deleteCategorieInList({categorie: this.data})),
      (error) => console.error(error)
    );
    this._dialogRef.close();
  }

  notDelete(): void {
    this._dialogRef.close();
  }

}

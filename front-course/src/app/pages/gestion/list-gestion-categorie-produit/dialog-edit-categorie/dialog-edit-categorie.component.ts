import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../../core/services/categorie.service";
import {Categorie} from "../../../../core/models/categorie";
import {Store} from "@ngrx/store";
import {updateCategorieInList} from "../../../../core/state/categorie.action";


@Component({
  selector: 'app-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.css']
})
export class DialogEditCategorieComponent implements OnInit {

  categorie: Categorie;

  constructor(private dialogRef: MatDialogRef<DialogEditCategorieComponent>,
              private categorieService: CategorieService,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
    this.categorie = JSON.parse(JSON.stringify(this.data));
  }

  ngOnInit(): void {
  }

  edit(): void {
    this.categorieService.editCategorie(this.categorie).subscribe(
      () => this.store.dispatch(updateCategorieInList({categorie: this.categorie})),
      (error) => console.error(error)
    );
    this.dialogRef.close();
  }

  notEdit(): void {
    this.dialogRef.close();
  }

}

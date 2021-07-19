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


  constructor(private dialogRef: MatDialogRef<DialogDeleteCategorieComponent>,
              private categorieService: CategorieService,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Categorie) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.categorieService.deleteCategorie(this.data.id).subscribe(
      () => this.store.dispatch(deleteCategorieInList({categorie: this.data})),
      (error) => console.error(error)
    );
    this.dialogRef.close();
  }

  notDelete(): void {
    this.dialogRef.close();
  }

}

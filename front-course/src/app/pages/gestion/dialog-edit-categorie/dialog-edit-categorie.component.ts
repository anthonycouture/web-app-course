import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";
import {Categorie} from "../../../core/models/categorie";

interface _DialogDataEditCategorie {
  idCategorie: number;
  nomCategorie: string;
}

@Component({
  selector: 'app-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.css']
})
export class DialogEditCategorieComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogEditCategorieComponent>,
              private categorieService: CategorieService,
              @Inject(MAT_DIALOG_DATA) public data: _DialogDataEditCategorie) {
  }

  ngOnInit(): void {
  }

  edit(): void {
    let categorie = new Categorie(this.data.idCategorie, this.data.nomCategorie)
    this.categorieService.editCategorie(categorie).subscribe(
      () => console.log('ok'),
      (error) => console.error(error)
    );
    this.dialogRef.close();
  }

  notEdit(): void {
    this.dialogRef.close();
  }

}

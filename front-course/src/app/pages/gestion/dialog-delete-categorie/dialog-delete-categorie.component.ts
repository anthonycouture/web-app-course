import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategorieService} from "../../../core/services/categorie.service";


interface _DialogDataDeleteCategorie {
  idCategorie: number;
  nomCategorie: string;
}

@Component({
  selector: 'app-dialog-delete-categorie',
  templateUrl: './dialog-delete-categorie.component.html',
  styleUrls: ['./dialog-delete-categorie.component.css']
})
export class DialogDeleteCategorieComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<DialogDeleteCategorieComponent>,
              private categorieService: CategorieService,
              @Inject(MAT_DIALOG_DATA) public data: _DialogDataDeleteCategorie) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.categorieService.deleteCategorie(this.data.idCategorie).subscribe(
      () => console.log('ok'),
      (error) => console.error(error)
    );
    this.dialogRef.close();
  }

  notDelete(): void {
    this.dialogRef.close();
  }

}

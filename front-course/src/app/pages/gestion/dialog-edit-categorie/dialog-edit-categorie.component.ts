import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
              @Inject(MAT_DIALOG_DATA) public data: _DialogDataEditCategorie) {
  }

  ngOnInit(): void {
  }

  edit(): void {
    this.dialogRef.close();
  }

  notEdit(): void {
    this.dialogRef.close();
  }

}

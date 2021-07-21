import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Produit} from "../../../../core/models/produit";
import {deleteProduitInCategorie} from "../../../../core/state/categorie.action";

@Component({
  selector: 'app-dialog-delete-produit',
  templateUrl: './dialog-delete-produit.component.html',
  styleUrls: ['./dialog-delete-produit.component.css']
})
export class DialogDeleteProduitComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogDeleteProduitComponent>,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Produit) {
  }

  ngOnInit(): void {
  }


  delete(): void {
    this.store.dispatch(deleteProduitInCategorie({produit: this.data}));
    this.dialogRef.close();
  }

  notDelete(): void {
    this.dialogRef.close();
  }
}

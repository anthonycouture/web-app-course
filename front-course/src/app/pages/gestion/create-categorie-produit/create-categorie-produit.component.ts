import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateCategorieComponent} from "../../../shared/dialog/dialog-create-categorie/dialog-create-categorie.component";
import {DialogCreateProduitComponent} from "../../../shared/dialog/dialog-create-produit/dialog-create-produit.component";

@Component({
  selector: 'app-create-categorie-produit',
  templateUrl: './create-categorie-produit.component.html',
  styleUrls: ['./create-categorie-produit.component.css']
})
export class CreateCategorieProduitComponent implements OnInit {

  constructor(private _dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  openDialogCreateCategorie(): void {
    this._dialog.open(DialogCreateCategorieComponent, {
      width: '350px',
    });
  }

  openDialogCreateProduit(): void {
    this._dialog.open(DialogCreateProduitComponent, {
      width: '350px',
    });
  }

}

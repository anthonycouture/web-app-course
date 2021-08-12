import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogAddProduitInListComponent} from "../../../shared/dialog/dialog-add-produit-in-list/dialog-add-produit-in-list.component";

@Component({
  selector: 'app-add-product-in-list',
  templateUrl: './add-product-in-list.component.html',
  styleUrls: ['./add-product-in-list.component.css']
})
export class AddProductInListComponent implements OnInit {

  constructor(private _dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  openDialogAddProduitInList(): void {
    this._dialog.open(DialogAddProduitInListComponent, {
      width: '350px',
    });
  }

}

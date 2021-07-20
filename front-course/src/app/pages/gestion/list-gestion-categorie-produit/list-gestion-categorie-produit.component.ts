import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {DialogDeleteCategorieComponent} from "./dialog-delete-categorie/dialog-delete-categorie.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditCategorieComponent} from "./dialog-edit-categorie/dialog-edit-categorie.component";
import {Categorie} from "../../../core/models/categorie";

@Component({
  selector: 'app-list-gestion-categorie-produit',
  templateUrl: './list-gestion-categorie-produit.component.html',
  styleUrls: ['./list-gestion-categorie-produit.component.css']
})
export class ListGestionCategorieProduitComponent implements OnChanges {

  @Input() categories!: Categorie[];


  treeControl = new NestedTreeControl<Categorie>(node => node.produits);
  dataSource = new MatTreeNestedDataSource<Categorie>();

  constructor(private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.categories;
  }


  hasChild = (_: number, node: Categorie) => node.produits && node.produits.length >= 0;

  collapse_all(): void {
    this.dataSource.data.forEach(produitNode => {
      this.treeControl.collapse(produitNode);
    })
  }

  expand_all(): void {
    this.dataSource.data.forEach(produitNode => {
      this.treeControl.expand(produitNode);
    })
  }


  openDialogDeleteCategorie(categorie: Categorie): void {
    this.dialog.open(DialogDeleteCategorieComponent, {
      width: '350px',
      data: categorie
    });
  }


  openDialogEditCategorie(categorie: Categorie): void {
    this.dialog.open(DialogEditCategorieComponent, {
      width: '350px',
      data: categorie
    });
  }

}

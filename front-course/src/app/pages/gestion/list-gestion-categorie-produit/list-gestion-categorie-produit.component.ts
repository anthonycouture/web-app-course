import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {ProduitNode} from "../../../shared/interface/produit-node";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {Produit} from "../../../core/models/produit";
import {listProduitToListProduitNode} from "../../../shared/utils/utils-produit-node";
import {DialogDeleteCategorieComponent} from "./dialog-delete-categorie/dialog-delete-categorie.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditCategorieComponent} from "./dialog-edit-categorie/dialog-edit-categorie.component";

@Component({
  selector: 'app-list-gestion-categorie-produit',
  templateUrl: './list-gestion-categorie-produit.component.html',
  styleUrls: ['./list-gestion-categorie-produit.component.css']
})
export class ListGestionCategorieProduitComponent implements OnChanges {

  @Input() listProduit!: Produit[];


  treeControl = new NestedTreeControl<ProduitNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ProduitNode>();
  TREE_PRODUIT: ProduitNode[] = [];

  constructor(private dialog: MatDialog) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.TREE_PRODUIT = listProduitToListProduitNode(this.listProduit);
    this.dataSource.data = this.TREE_PRODUIT;
    this.TREE_PRODUIT.forEach(produitNode => {
      this.treeControl.expand(produitNode);
    });
  }


  hasChild = (_: number, node: ProduitNode) => node.children && node.children.length > 0;

  collapse_all(): void {
    this.TREE_PRODUIT.forEach(produitNode => {
      this.treeControl.collapse(produitNode);
    })
  }

  expand_all(): void {
    this.TREE_PRODUIT.forEach(produitNode => {
      this.treeControl.expand(produitNode);
    })
  }


  openDialogDeleteCategorie(idCategorie: number, nomCategorie: string): void {
    this.dialog.open(DialogDeleteCategorieComponent, {
      width: '350px',
      data: {idCategorie: idCategorie, nomCategorie: nomCategorie}
    });
  }


  openDialogEditCategorie(idCategorie: number, nomCategorie: string): void {
    this.dialog.open(DialogEditCategorieComponent, {
      width: '350px',
      data: {idCategorie: idCategorie, nomCategorie: nomCategorie}
    });
  }

}

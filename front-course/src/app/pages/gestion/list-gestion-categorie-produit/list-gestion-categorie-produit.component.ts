import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {DialogDeleteCategorieComponent} from "../../../shared/dialog/dialog-delete-categorie/dialog-delete-categorie.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditCategorieComponent} from "../../../shared/dialog/dialog-edit-categorie/dialog-edit-categorie.component";
import {Categorie} from "../../../core/models/categorie";
import {Produit} from "../../../core/models/produit";
import {DialogDeleteProduitComponent} from "../../../shared/dialog/dialog-delete-produit/dialog-delete-produit.component";
import {DialogEditProduitComponent} from "../../../shared/dialog/dialog-edit-produit/dialog-edit-produit.component";
import {firstValueFrom} from "rxjs";


interface GestionNode {
  item: Produit | Categorie;
  children?: GestionNode[];
}

@Component({
  selector: 'app-list-gestion-categorie-produit',
  templateUrl: './list-gestion-categorie-produit.component.html',
  styleUrls: ['./list-gestion-categorie-produit.component.css']
})
export class ListGestionCategorieProduitComponent implements OnChanges {

  @Input() categories: Categorie[] = [];
  @Output() deleteCategorie = new EventEmitter<number>();
  @Output() editCategorie = new EventEmitter<Categorie>();
  @Output() deleteProduit = new EventEmitter<number>();
  @Output() editProduit = new EventEmitter<{ produit: Produit, idCategorie: number }>();


  treeControl = new NestedTreeControl<GestionNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<GestionNode>();

  constructor(private _dialog: MatDialog) {
  }

  ngOnChanges() {
    let expandedNodes = new Array<GestionNode>();
    this.dataSource.data.forEach(node => {
      if (this.treeControl.isExpanded(node))
        expandedNodes.push(node)
    });
    this.dataSource.data = [];
    this.dataSource.data = this._categoriesToGestionNode(this.categories);
    this.dataSource.data.forEach(node => {
      if (expandedNodes.find(nodeExpand => nodeExpand.item.id === node.item.id))
        this.treeControl.expand(node);
    })
  }

  private _categoriesToGestionNode(categories: Categorie[]): GestionNode[] {
    return categories.map((categorie) => {
      let children: GestionNode[] = [];
      categorie.produits.forEach((produit) => children.push({item: produit}));
      return {item: categorie, children: children};
    })
  }


  hasChild = (_: number, node: GestionNode) => node.children;

  collapse_all(): void {
    this.dataSource.data.forEach(node => {
      this.treeControl.collapse(node);
    })
  }

  expand_all(): void {
    this.dataSource.data.forEach(node => {
      this.treeControl.expand(node);
    })
  }


  openDialogDeleteCategorie(categorie: Categorie): void {
    const dialogRef = this._dialog.open(DialogDeleteCategorieComponent, {
      width: '350px',
      data: categorie
    });

    firstValueFrom(dialogRef.afterClosed()).then(result => {
      if (!!result && result !== false) {
        this.deleteCategorie.emit(result);
      }
    });
  }


  openDialogEditCategorie(categorie: Categorie): void {
    const dialogRef = this._dialog.open(DialogEditCategorieComponent, {
      width: '350px',
      data: categorie
    });

    firstValueFrom(dialogRef.afterClosed()).then(result => {
      if (!!result && result !== false) {
        this.editCategorie.emit(result);
      }
    });
  }

  openDialogDeleteProduit(produit: Produit): void {
    const dialogRef = this._dialog.open(DialogDeleteProduitComponent, {
      width: '350px',
      data: produit
    });


    firstValueFrom(dialogRef.afterClosed()).then(result => {
      if (!!result && result !== false) {
        this.deleteProduit.emit(result);
      }
    });
  }

  openDialogEditProduit(produit: Produit): void {
    const dialogRef = this._dialog.open(DialogEditProduitComponent, {
      width: '350px',
      data: {produit: produit, categories: this.categories}
    });

    firstValueFrom(dialogRef.afterClosed()).then(result => {
      if (!!result && result !== false) {
        this.editProduit.emit(result);
      }
    });
  }
}

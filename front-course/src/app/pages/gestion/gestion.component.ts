import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../core/services/produit.service";
import {ProduitNode} from "../../shared/interface/produit-node";
import {listProduitToListProduitNode} from "../../shared/utils/utils-produit-node";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  TREE_PRODUIT: ProduitNode[] = [];
  treeControl = new NestedTreeControl<ProduitNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ProduitNode>();


  constructor(private produitService: ProduitService) {
    this.produitService.getProduits().subscribe(
      (data) => {
        this.TREE_PRODUIT = listProduitToListProduitNode(data);
        this.dataSource.data = this.TREE_PRODUIT;
      },
      (error) => console.error(error)
    );
  }

  hasChild = (_: number, node: ProduitNode) => node.children && node.children.length > 0;

  ngOnInit(): void {

  }

}

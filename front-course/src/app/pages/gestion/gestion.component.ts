import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../core/services/produit.service";
import {ProduitNode} from "../../shared/interface/produit-node";
import {listProduitToListProduitNode} from "../../shared/utils/utils-produit-node";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {Produit} from "../../core/models/produit";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  private listProduit: Produit[] = [];
  TREE_PRODUIT: ProduitNode[] = [];
  treeControl = new NestedTreeControl<ProduitNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ProduitNode>();
  listOption: string[] = [];

  constructor(private produitService: ProduitService) {
    this.produitService.getProduits().subscribe(
      (data) => {
        this.listProduit = data;
        data.forEach(produit => this.listOption.push(produit.nom));
        this.TREE_PRODUIT = listProduitToListProduitNode(data);
        this.dataSource.data = this.TREE_PRODUIT;


        this.TREE_PRODUIT.forEach(produitNode => {
          this.treeControl.expand(produitNode);
        })
      },
      (error) => console.error(error)
    );
  }

  hasChild = (_: number, node: ProduitNode) => node.children && node.children.length > 0;

  ngOnInit(): void {

  }

  filterByOption(valueTab: string[]) :void {
    console.log(valueTab)
    let list = this.listProduit.filter(produit => {
      let nomProduit = produit.nom.toLowerCase();
      let responseFilter = false;
      valueTab.forEach(value => {
          if (nomProduit === value.toLowerCase())
            responseFilter = true;
        }
      )
      return responseFilter;
    });

    this.TREE_PRODUIT = listProduitToListProduitNode(list);
    this.dataSource.data = this.TREE_PRODUIT;
    this.TREE_PRODUIT.forEach(produitNode => {
      this.treeControl.expand(produitNode);
    });
  }

  collapse_all(): void{
    this.TREE_PRODUIT.forEach(produitNode => {
      this.treeControl.collapse(produitNode);
    })
  }

  expand_all(): void{
    this.TREE_PRODUIT.forEach(produitNode => {
      this.treeControl.expand(produitNode);
    })
  }
}

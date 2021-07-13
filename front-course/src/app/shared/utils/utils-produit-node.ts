import {ProduitNode} from "../interface/produit-node";
import {Categorie} from "../../core/models/categorie";
import {Produit} from "../../core/models/produit";

export function getproduitNodeByCategorie(listProduitNode: ProduitNode[], categorie: Categorie): ProduitNode | undefined  {
  for (let produitNode of listProduitNode) {
    if (JSON.stringify(produitNode.categorie) === JSON.stringify(categorie))
      return produitNode;
  }
  return undefined;
}

export function listProduitToListProduitNode(listProduit: Produit[]): ProduitNode[] {
  let listProduitNode : ProduitNode[] = [];
  for(let produit of listProduit){
    let produitNode = getproduitNodeByCategorie(listProduitNode, produit.categorie);
    if(produitNode !== undefined) {
      if(produitNode.children) {
        produitNode.children.push(produit);
      } else {
        produitNode.children = [produit];
      }
    } else {
      listProduitNode.push(
        {
          categorie: produit.categorie,
          children: [produit]
        }
      );
    }
  }
  return listProduitNode;
}

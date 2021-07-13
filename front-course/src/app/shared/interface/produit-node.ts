import {Categorie} from "../../core/models/categorie";
import {Produit} from "../../core/models/produit";

export interface ProduitNode {
  categorie: Categorie;
  children?: Produit[];
}

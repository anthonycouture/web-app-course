import {Produit} from "./produit";

export class Categorie {
  public id: number;
  public nom: string;
  public produits: Produit[];

  constructor(id: number, nom: string, produits: Produit[]) {
    this.id = id;
    this.nom = nom;
    this.produits = produits;
  }
}

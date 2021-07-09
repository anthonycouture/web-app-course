import {Categorie} from "./categorie.model";

export class Produit {

  public id: number;
  public nom: string;
  public categorie: Categorie


  constructor(id: number, nom: string, categorie: Categorie) {
    this.id = id;
    this.nom = nom;
    this.categorie = categorie;
  }
}

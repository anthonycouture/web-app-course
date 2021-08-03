export class ItemCourse {
  public id: number;
  public idProduit: number;
  public quantite: number;


  constructor(id: number, idProduit: number, quantite: number) {
    this.id = id;
    this.idProduit = idProduit;
    this.quantite = quantite;
  }
}

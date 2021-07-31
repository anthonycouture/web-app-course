import {Injectable} from '@angular/core';
import {Categorie} from "../models/categorie";
import {BehaviorSubject} from "rxjs";
import {Produit} from "../models/produit";

@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService {

  private readonly _categoriesSource = new BehaviorSubject<Categorie[]>([]);

  readonly categories$ = this._categoriesSource.asObservable();

  constructor() {
  }

  getCategories(): Categorie[] {
    return this._categoriesSource.getValue();
  }

  setCategories(categories: Categorie []): void {
    this._categoriesSource.next(categories);
  }

  addCategories(categorie: Categorie): void {
    this.setCategories([...this.getCategories(), categorie]);
  }

  removeCategorie(categorieId: number): void {
    this.setCategories(this.getCategories().filter(item => item.id !== categorieId));
  }

  updateCategorie(categorie: Categorie): void {
    this.setCategories(this.getCategories().map(item => item.id === categorie.id ? categorie : item));
  }

  addProduitInCategorie(categorieId: number, produit: Produit): void {
    const categories = this.getCategories().map(categorie => {
      if (categorie.id === categorieId) {
        let categorieUpdate = JSON.parse(JSON.stringify(categorie));
        let produitsCategorieState = categorieUpdate.produits ?? [];
        produitsCategorieState.push(produit)
        return categorieUpdate;
      }
      return categorie;
    });
    this.setCategories(categories);
  }

  deleteProduitInCategorie(produitId: number): void {
    const categories = this.getCategories().map(categorie => {
      let categorieUpdate = Object.assign({}, categorie);
      categorieUpdate.produits = categorieUpdate.produits?.filter(item => item.id !== produitId)
      return categorieUpdate;
    });
    this.setCategories(categories);
  }

  updateProduitInCategorie(categorieId: number, produit: Produit): void {
    const categories = this.getCategories().map(categorie => {
      let categorieUpdate = Object.assign({}, categorie);
      categorieUpdate.produits = categorie.produits?.filter(item => item.id !== produit.id)
      if (categorieUpdate.id === categorieId) {
        let produitsCategorieState = categorieUpdate.produits ?? [];
        produitsCategorieState.push(produit)
      }
      return categorieUpdate;
    });
    this.setCategories(categories);
  }
}

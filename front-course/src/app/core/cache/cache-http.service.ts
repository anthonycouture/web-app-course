import {Injectable} from '@angular/core';
import {Categorie} from "../models/categorie";
import {ItemCourse} from "../models/item-course";
import {Produit} from "../models/produit";


@Injectable({
  providedIn: 'root'
})
export class CacheHttpService {

  private _cacheCategorie: Categorie[];
  private _cacheItemCourse: ItemCourse[];
  private _cacheItemPreDefinedCourse: ItemCourse[];

  constructor() {
    this._cacheCategorie = [];
    this._cacheItemCourse = [];
    this._cacheItemPreDefinedCourse = [];
  }

  get cacheCategorie(): Categorie[] {
    return this._cacheCategorie;
  }

  set cacheCategorie(categories: Categorie[]) {
    this._cacheCategorie = categories;
  }

  deleteCategorie(idCategorie: number) {
    const categorieDelete: Categorie | undefined = this.cacheCategorie.find((item) => item.id === idCategorie);
    if (!!categorieDelete) {
      this._cacheItemPreDefinedCourse = this._cacheItemPreDefinedCourse
        .filter((item) => !categorieDelete.produits
          .every((produit) => !(produit.id === item.id))
        );
      this.cacheCategorie = this.cacheCategorie.filter((item) => item.id !== categorieDelete.id);
    }
  }

  editCategorie(categorie: Categorie) {
    this.cacheCategorie = this.cacheCategorie.map((item) => item.id !== categorie.id ? item : categorie);
  }

  addCategorie(categorie: Categorie) {
    this.cacheCategorie = [...this.cacheCategorie, categorie];
  }

  get cacheItemCourse(): ItemCourse[] {
    return this._cacheItemCourse;
  }

  set cacheItemCourse(itemCourses: ItemCourse[]) {
    this._cacheItemCourse = itemCourses;
  }

  deleteItemCourse(idItemCourse: number) {
    this.cacheItemCourse = this.cacheItemCourse.filter((item) => item.id !== idItemCourse);
  }

  updateItemCourse(itemCourse: ItemCourse) {
    this.cacheItemCourse = this.cacheItemCourse.map((item) => item.id !== itemCourse.id ? item : itemCourse);
  }

  addItemCourse(itemCourse: ItemCourse) {
    this.cacheItemCourse = [...this.cacheItemCourse, itemCourse];
  }

  get cacheItemPreDefinedCourse(): ItemCourse[] {
    return this._cacheItemPreDefinedCourse;
  }

  set cacheItemPreDefinedCourse(itemCourses: ItemCourse[]) {
    this._cacheItemPreDefinedCourse = itemCourses;
  }

  updateItemCoursePreDefinedCourse(itemCourse: ItemCourse) {
    this.cacheItemPreDefinedCourse = this.cacheItemPreDefinedCourse.map((item) => item.id !== itemCourse.id ? item : itemCourse);
  }

  deleteItemCoursePreDefinedCourse(idItemCourse: number) {
    this.cacheItemPreDefinedCourse = this.cacheItemPreDefinedCourse.filter((item) => item.id !== idItemCourse);
  }

  addItemCoursePreDefined(itemCourse: ItemCourse) {
    this.cacheItemPreDefinedCourse = [...this.cacheItemPreDefinedCourse, itemCourse];
  }

  deleteProduit(idProduit: number) {
    this.cacheCategorie = this.cacheCategorie.map(categorie => {
      categorie.produits = categorie.produits.filter(item => item.id !== idProduit)
      return categorie;
    });
    this.cacheItemPreDefinedCourse = this.cacheItemPreDefinedCourse
      .filter((item) => item.idProduit !== idProduit);
  }

  updateProduit(produit: Produit, idCategorie: number) {
    this.cacheCategorie = this.cacheCategorie.map(categorie => {
      categorie.produits = categorie.produits.filter(item => item.id !== produit.id)
      if (categorie.id === idCategorie) {
        categorie.produits.push(produit)
      }
      return categorie;
    });
  }

  addProduit(produit: Produit, idCategorie: number) {
    this.cacheCategorie = this.cacheCategorie.map(categorie => {
      if (categorie.id === idCategorie) {
        categorie.produits = [...categorie.produits, produit];
      }
      return categorie;
    });
  }

}

export function cacheValide(time: number): boolean {
  const timeToCacheService: number = 5; // temps en minutes
  const millis = Date.now() - time;
  return millis <= (timeToCacheService * 60 * 1000);
}

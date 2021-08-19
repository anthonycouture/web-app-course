import {Injectable} from '@angular/core';
import {Categorie} from "../models/categorie";
import {ItemCourse} from "../models/item-course";
import {Produit} from "../models/produit";


@Injectable({
  providedIn: 'root'
})
export class CacheService {

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
    const categorieDelete: Categorie | undefined = this._cacheCategorie.find((item) => item.id === idCategorie);
    if (!!categorieDelete) {
      this._cacheItemPreDefinedCourse = this._cacheItemPreDefinedCourse
        .filter((item) => !categorieDelete.produits
          .every((produit) => !(produit.id === item.id))
        );
      this._cacheCategorie = this._cacheCategorie.filter((item) => item.id === categorieDelete.id);
    }
  }

  editCategorie(categorie: Categorie) {
    this._cacheCategorie = this._cacheCategorie.map((item) => item.id !== categorie.id ? item : categorie);
  }

  addCategorie(categorie: Categorie) {
    this._cacheCategorie = [...this._cacheCategorie, categorie];
  }

  get cacheItemCourse(): ItemCourse[] {
    return this._cacheItemCourse;
  }

  set cacheItemCourse(itemCourses: ItemCourse[]) {
    this._cacheItemCourse = itemCourses;
  }

  deleteItemCourse(idItemCourse: number) {
    this._cacheItemCourse = this._cacheItemCourse.filter((item) => item.id !== idItemCourse);
  }

  updateItemCourse(itemCourse: ItemCourse) {
    this._cacheItemCourse = this._cacheItemCourse.map((item) => item.id !== itemCourse.id ? item : itemCourse);
  }

  addItemCourse(itemCourse: ItemCourse) {
    this._cacheItemCourse = [...this._cacheItemCourse, itemCourse];
  }

  get cacheItemPreDefinedCourse(): ItemCourse[] {
    return this._cacheItemPreDefinedCourse;
  }

  set cacheItemPreDefinedCourse(itemCourses: ItemCourse[]) {
    this._cacheItemPreDefinedCourse = itemCourses;
  }

  updateItemCoursePreDefinedCourse(itemCourse: ItemCourse) {
    this._cacheItemCourse = this._cacheItemCourse.map((item) => item.id !== itemCourse.id ? item : itemCourse);
  }

  deleteItemCoursePreDefinedCourse(idItemCourse: number) {
    this._cacheItemCourse = this._cacheItemCourse.filter((item) => item.id !== idItemCourse);
  }

  deleteProduit(idProduit: number) {
    this._cacheCategorie = this._cacheCategorie.map(categorie => {
      categorie.produits = categorie.produits.filter(item => item.id !== idProduit)
      return categorie;
    });
  }

  updateProduit(produit: Produit, idCategorie: number) {
    this._cacheCategorie = this._cacheCategorie.map(categorie => {
      categorie.produits = categorie.produits.filter(item => item.id !== produit.id)
      if (categorie.id === idCategorie) {
        categorie.produits.push(produit)
      }
      return categorie;
    });
  }

  addProduit(produit: Produit, idCategorie: number) {
    this._cacheCategorie = this._cacheCategorie.map(categorie => {
      if (categorie.id === idCategorie) {
        categorie.produits.push(produit)
        return categorie;
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

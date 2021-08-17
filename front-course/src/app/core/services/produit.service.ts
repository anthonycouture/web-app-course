import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Produit} from "../models/produit";
import {CategorieService} from "./categorie.service";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private _url = environment.apiUrl + '/produits';

  constructor(private _http: HttpClient,
              private _categorieService: CategorieService) {
  }

  deleteProduit(idProduit: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idProduit)
      .pipe(
        map(() => {
          this._categorieService._cacheCategorie = this._categorieService._cacheCategorie.map(categorie => {
            categorie.produits = categorie.produits?.filter(item => item.id !== idProduit)
            return categorie;
          });
        })
      );
  }

  updateProduit(idCategorie: number, produit: Produit): Observable<Produit> {
    return this._http.put<Produit>(this._url + '/' + idCategorie, produit)
      .pipe(
        map((produit) => {
          this._categorieService._cacheCategorie = this._categorieService._cacheCategorie.map(categorie => {
            categorie.produits = categorie.produits?.filter(item => item.id !== produit.id)
            if (categorie.id === idCategorie) {
              let produitsCategorieState = categorie.produits ?? [];
              produitsCategorieState.push(produit)
            }
            return categorie;
          });
          return produit;
        })
      );
  }

  createProduit(idCategorie: number, nameProduit: string): Observable<Produit> {
    return this._http.post<Produit>(this._url + '/' + idCategorie, {nom: nameProduit})
      .pipe(
        map((produit) => {
          this._categorieService._cacheCategorie = this._categorieService._cacheCategorie.map(categorie => {
            if (categorie.id === idCategorie) {
              let produitsCategorieState = categorie.produits ?? [];
              produitsCategorieState.push(produit)
              return categorie;
            }
            return categorie;
          });
          return produit;
        })
      );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Produit} from "../models/produit";
import {CacheHttpService} from "../cache/cache-http.service";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private _url = environment.apiUrl + '/produits';

  constructor(private _http: HttpClient,
              private _cacheService: CacheHttpService) {
  }

  deleteProduit(idProduit: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idProduit)
      .pipe(map(() => this._cacheService.deleteProduit(idProduit)));
  }

  updateProduit(idCategorie: number, produit: Produit): Observable<Produit> {
    return this._http.put<Produit>(this._url + '/' + idCategorie, produit)
      .pipe(
        map((produit) => {
            this._cacheService.updateProduit(produit, idCategorie);
            return produit;
          }
        )
      );
  }

  createProduit(idCategorie: number, nameProduit: string): Observable<Produit> {
    return this._http.post<Produit>(this._url + '/' + idCategorie, {nom: nameProduit})
      .pipe(
        map((produit) => {
          this._cacheService.addProduit(produit, idCategorie);
          return produit;
        })
      );
  }
}

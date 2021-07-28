import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Produit} from "../models/produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private _url = environment.apiUrl + '/produits';

  constructor(private _http: HttpClient) {
  }

  deleteProduit(idProduit: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idProduit);
  }

  updateProduit(idCategorie: number, produit: Produit): Observable<Produit> {
    return this._http.put<Produit>(this._url + '/' + idCategorie, produit);
  }

  createProduit(idCategorie: number, nameProduit: string): Observable<Produit> {
    return this._http.post<Produit>(this._url + '/' + idCategorie, {nom: nameProduit});
  }
}

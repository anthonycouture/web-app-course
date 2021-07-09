import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Produit} from "../models/produit.model";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<Produit[]> {
    console.log(this.URL);
    return this.http.get<Produit[]>(this.URL + '/produits');
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

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
}

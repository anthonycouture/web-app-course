import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private URL = environment.apiUrl + '/produits';

  constructor(private http: HttpClient) {
  }

  deleteProduit(idProduit: number): Observable<void> {
    return this.http.delete<void>(this.URL + '/' + idProduit);
  }
}

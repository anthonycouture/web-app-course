import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Categorie} from "../models/categorie";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private _url = environment.apiUrl + '/categories';

  constructor(private _http: HttpClient) {
  }


  getCategories(): Observable<Categorie[]> {
    return this._http.get<Categorie[]>(this._url);
  }


  deleteCategorie(idCategorie: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idCategorie);
  }

  editCategorie(categorie: Categorie): Observable<Categorie> {
    return this._http.put<Categorie>(this._url + '/' + categorie.id, categorie);
  }

  createCategorie(nomCategorie: string): Observable<Categorie> {
    return this._http.post<Categorie>(this._url, {nom: nomCategorie});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Categorie} from "../models/categorie";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private URL = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) {
  }


  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL);
  }


  deleteCategorie(idCategorie: number): Observable<void> {
    return this.http.delete<void>(this.URL + '/' + idCategorie);
  }

  editCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.URL + '/' + categorie.id, categorie);
  }
}

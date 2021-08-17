import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Categorie} from "../models/categorie";
import {cacheValideService} from "../../shared/utils/cache-utils";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private _url = environment.apiUrl + '/categories';

  _cacheCategorie: Categorie[];

  private _timeCache: number | undefined;

  constructor(private _http: HttpClient) {
    this._cacheCategorie = [];
  }


  getCategories(): Observable<Categorie[]> {
    if (!this._timeCache || !cacheValideService(this._timeCache)) {
      return this._http.get<Categorie[]>(this._url)
        .pipe(
          map((categorieTab) => {
            this._timeCache = Date.now();
            this._cacheCategorie = categorieTab;
            return categorieTab;
          })
        );
    } else {
      return of(this._cacheCategorie);
    }
  }


  deleteCategorie(idCategorie: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idCategorie)
      .pipe(
        map(() => {
          this._cacheCategorie = this._cacheCategorie.filter((item) => item.id !== idCategorie)
        })
      );
  }

  editCategorie(categorie: Categorie): Observable<Categorie> {
    return this._http.put<Categorie>(this._url + '/' + categorie.id, categorie)
      .pipe(
        map((categorie) => {
          this._cacheCategorie = this._cacheCategorie.map((item) => item.id !== categorie.id ? item : categorie);
          return categorie;
        })
      );
  }

  createCategorie(nomCategorie: string): Observable<Categorie> {
    return this._http.post<Categorie>(this._url, {nom: nomCategorie})
      .pipe(
        map((categorie) => {
          this._cacheCategorie = [...this._cacheCategorie, categorie];
          return categorie;
        })
      );
  }
}

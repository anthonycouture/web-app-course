import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Categorie} from "../models/categorie";
import {CacheService, cacheValide} from "../cache/cache.service";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private _url = environment.apiUrl + '/categories';


  private _timeCache: number | undefined;

  constructor(private _http: HttpClient,
              private _cacheService: CacheService) {
  }


  getCategories(): Observable<Categorie[]> {
    if (!this._timeCache || !cacheValide(this._timeCache)) {
      return this._http.get<Categorie[]>(this._url)
        .pipe(
          map((categories) => {
            this._timeCache = Date.now()
            this._cacheService.cacheCategorie = categories;
            return categories;
          })
        );
    } else {
      return of(this._cacheService.cacheCategorie);
    }
  }


  deleteCategorie(idCategorie: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idCategorie)
      .pipe(map(() => this._cacheService.deleteCategorie(idCategorie)));
  }

  editCategorie(categorie: Categorie): Observable<Categorie> {
    return this._http.put<Categorie>(this._url + '/' + categorie.id, categorie)
      .pipe(
        map((categorie) => {
          this._cacheService.editCategorie(categorie);
          return categorie;
        })
      );
  }

  createCategorie(nomCategorie: string): Observable<Categorie> {
    return this._http.post<Categorie>(this._url, {nom: nomCategorie})
      .pipe(
        map((categorie) => {
          this._cacheService.addCategorie(categorie);
          return categorie;
        })
      );
  }
}

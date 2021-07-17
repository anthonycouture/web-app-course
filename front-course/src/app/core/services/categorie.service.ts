import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }


  deleteCategorie(idCategorie: number): Observable<void> {
    return this.http.delete<void>(this.URL + '/categories/' + idCategorie);
  }
}

import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ItemCourse} from "../models/item-course";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PreDefinedCourseService {

  private _url = environment.apiUrl + '/course-pre-defined';

  constructor(private _http: HttpClient) {
  }

  getPreDefinedListeCours(): Observable<ItemCourse[]> {
    return this._http.get<ItemCourse[]>(this._url);
  }
}

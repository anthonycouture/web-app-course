import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ItemCourse} from "../models/item-course";
import {HttpClient} from "@angular/common/http";

interface ItemCourseNotId {
  idProduit: number;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _url = environment.apiUrl + '/course';

  constructor(private _http: HttpClient) {
  }


  getListeCourse(): Observable<ItemCourse[]> {
    return this._http.get<ItemCourse[]>(this._url);
  }

  deleteItemCourseInList(idItemCourse: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idItemCourse);
  }

  updateItemCourseInList(itemCourse: ItemCourse): Observable<ItemCourse> {
    return this._http.put<ItemCourse>(this._url, itemCourse);
  }

  addItemCourseInList(itemCourse: ItemCourseNotId): Observable<ItemCourse> {
    return this._http.post<ItemCourse>(this._url, itemCourse);
  }
}

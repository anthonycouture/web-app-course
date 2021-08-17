import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map, Observable, of} from "rxjs";
import {ItemCourse} from "../models/item-course";
import {HttpClient} from "@angular/common/http";
import {cacheValideService} from "../../shared/utils/cache-utils";

interface ItemCourseNotId {
  idProduit: number;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _url = environment.apiUrl + '/course';

  private _cacheItemCourse: ItemCourse[];

  private _timeCache: number | undefined;

  constructor(private _http: HttpClient) {
    this._cacheItemCourse = [];
  }


  getListeCourse(): Observable<ItemCourse[]> {
    if (!this._timeCache || !cacheValideService(this._timeCache)) {
      return this._http.get<ItemCourse[]>(this._url)
        .pipe(
          map((itemCourseTab) => {
            this._timeCache = Date.now();
            this._cacheItemCourse = itemCourseTab;
            return itemCourseTab;
          })
        );
    } else {
      return of(this._cacheItemCourse);
    }
  }

  deleteItemCourseInList(idItemCourse: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idItemCourse)
      .pipe(
        map(() => {
          this._cacheItemCourse = this._cacheItemCourse.filter((item) => item.id !== idItemCourse)
        })
      );
  }

  updateItemCourseInList(itemCourse: ItemCourse): Observable<ItemCourse> {
    return this._http.put<ItemCourse>(this._url, itemCourse)
      .pipe(
        map((itemCourse) => {
          this._cacheItemCourse = this._cacheItemCourse.map((item) => item.id !== itemCourse.id ? item : itemCourse);
          return itemCourse;
        })
      );
  }

  addItemCourseInList(itemCourse: ItemCourseNotId): Observable<ItemCourse> {
    return this._http.post<ItemCourse>(this._url, itemCourse)
      .pipe(
        map((itemCourse) => {
          this._cacheItemCourse = [...this._cacheItemCourse, itemCourse];
          return itemCourse;
        })
      );
  }
}

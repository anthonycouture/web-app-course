import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map, Observable, of} from "rxjs";
import {ItemCourse} from "../models/item-course";
import {HttpClient} from "@angular/common/http";
import {CacheHttpService, cacheValide} from "../cache/cache-http.service";

interface ItemCourseNotId {
  idProduit: number;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _url = environment.apiUrl + '/course';


  timeCache: number | undefined;

  constructor(private _http: HttpClient,
              private _cacheService: CacheHttpService) {
  }


  getListeCourse(): Observable<ItemCourse[]> {
    if (!this.timeCache || !cacheValide(this.timeCache)) {
      return this._http.get<ItemCourse[]>(this._url)
        .pipe(
          map((itemCourseTab) => {
            this.timeCache = Date.now();
            this._cacheService.cacheItemCourse = itemCourseTab;
            return itemCourseTab;
          })
        );
    } else {
      return of(this._cacheService.cacheItemCourse);
    }
  }

  deleteItemCourseInList(idItemCourse: number): Observable<void> {
    return this._http.delete<void>(this._url + '/' + idItemCourse)
      .pipe(map(() => this._cacheService.deleteItemCourse(idItemCourse)));
  }

  updateItemCourseInList(itemCourse: ItemCourse): Observable<ItemCourse> {
    return this._http.put<ItemCourse>(this._url, itemCourse)
      .pipe(
        map((itemCourse) => {
          this._cacheService.updateItemCourse(itemCourse);
          return itemCourse;
        })
      );
  }

  createItemCourseInList(itemCourse: ItemCourseNotId): Observable<ItemCourse> {
    return this._http.post<ItemCourse>(this._url, itemCourse)
      .pipe(
        map((itemCourse) => {
          this._cacheService.addItemCourse(itemCourse);
          return itemCourse;
        })
      );
  }
}

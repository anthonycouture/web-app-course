import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map, Observable, of} from "rxjs";
import {ItemCourse} from "../models/item-course";
import {HttpClient} from "@angular/common/http";
import {CacheHttpService, cacheValide} from "../cache/cache-http.service";
import {CourseService} from "./course.service";

interface ItemCourseNotId {
  idProduit: number;
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class PreDefinedCourseService {

  private _url = environment.apiUrl + '/course-pre-defined';

  private _timeCache: number | undefined;

  constructor(private _http: HttpClient,
              private _cacheService: CacheHttpService,
              private _courseService: CourseService) {
  }

  getPreDefinedListeCourse(): Observable<ItemCourse[]> {
    if (!this._timeCache || !cacheValide(this._timeCache)) {
      return this._http.get<ItemCourse[]>(this._url)
        .pipe(
          map((itemCourseTab) => {
            this._timeCache = Date.now();
            this._cacheService.cacheItemPreDefinedCourse = itemCourseTab;
            return itemCourseTab;
          })
        );
    } else {
      return of(this._cacheService.cacheItemPreDefinedCourse);
    }
  }

  updateItemCoursePreDefinedListe(itemCourse: ItemCourse): Observable<ItemCourse> {
    return this._http.put<ItemCourse>(this._url, itemCourse).pipe(
      map((itemCourse) => {
        this._cacheService.updateItemCoursePreDefinedCourse(itemCourse);
        return itemCourse;
      })
    )
  }

  deleteItemCoursePreDefinedListe(idItemCourse: number): Observable<void> {
    return this._http.delete<void>(`${this._url}/${idItemCourse}`).pipe(
      map(() => {
        this._cacheService.deleteItemCoursePreDefinedCourse(idItemCourse);
      })
    )
  }

  createItemCourseInPreDefinedListe(itemCourse: ItemCourseNotId): Observable<ItemCourse> {
    return this._http.post<ItemCourse>(this._url, itemCourse)
      .pipe(
        map((itemCourse) => {
          this._cacheService.addItemCoursePreDefined(itemCourse);
          return itemCourse;
        })
      );
  }

  loadInListCourse(): Observable<void> {
    return this._http.post<void>(`${this._url}/load`, null).pipe(
      map(() => {
        this._courseService.timeCache = undefined;
      })
    );
  }
}

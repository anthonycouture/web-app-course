import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ItemCourse} from "../models/item-course";

@Injectable({
  providedIn: 'root'
})
export class PreDefinedCourseStoreService {

  private readonly _courseSource = new BehaviorSubject<ItemCourse[]>([]);


  readonly course$ = this._courseSource.asObservable();

  constructor() {
  }

  getCourse(): ItemCourse[] {
    return this._courseSource.getValue();
  }


  setCourse(itemCourses: ItemCourse[]): void {
    this._courseSource.next(itemCourses);
  }

  updateCourse(itemCourse: ItemCourse): void {
    this._courseSource.next(this.getCourse().map(item => item.id === itemCourse.id ? itemCourse : item));
  }

  deleteItemInCourse(idItemCourse: number): void {
    this._courseSource.next(this.getCourse().filter(item => item.id !== idItemCourse));
  }

  addItemInCourse(itemCourse: ItemCourse): void {
    this._courseSource.next([...this.getCourse(), itemCourse]);
  }
}

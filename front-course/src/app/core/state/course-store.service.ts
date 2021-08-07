import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ItemCourse} from "../models/item-course";

@Injectable({
  providedIn: 'root'
})
export class CourseStoreService {


  private readonly _courseSource = new BehaviorSubject<ItemCourse[]>([]);


  readonly course$ = this._courseSource.asObservable();


  constructor() {
  }

  getCourse(): ItemCourse[] {
    return this._courseSource.getValue();
  }


  setCourse(itemCourses: ItemCourse[]): void {
    return this._courseSource.next(itemCourses);
  }
}

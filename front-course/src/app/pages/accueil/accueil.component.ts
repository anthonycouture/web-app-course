import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../core/services/course.service";
import {CategorieService} from "../../core/services/categorie.service";
import {forkJoin} from "rxjs";
import {CategoriesStoreService} from "../../core/state/categories-store.service";
import {CourseStoreService} from "../../core/state/course-store.service";
import {itemCourseTabToListeCourseDetailsTab, ListeCourseDetails} from "../../shared/utils/course-utils";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {


  listeCourseDetails: ListeCourseDetails[] = [];

  constructor(private _courseService: CourseService,
              private _categorieService: CategorieService,
              private _categoriesStore: CategoriesStoreService,
              private _courseStore: CourseStoreService,
              private _spinnerStore: SpinnerStoreService) {
  }

  ngOnInit(): void {
    this._spinnerStore.setSpinner(true);
    forkJoin(
      {
        categories: this._categorieService.getCategories(),
        listeCourse: this._courseService.getListeCourse()
      }
    ).toPromise()
      .then((data) => {
        this._categoriesStore.setCategories(data.categories);
        this._courseStore.setCourse(data.listeCourse);
      })
      .finally(() => this._spinnerStore.setSpinner(false));

    this._courseStore.course$.subscribe((itemCourse) => {
      this.listeCourseDetails = itemCourseTabToListeCourseDetailsTab(itemCourse, this._categoriesStore.getCategories());
    })
  }

}

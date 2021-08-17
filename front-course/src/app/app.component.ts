import {Component, OnInit} from '@angular/core';
import {SnackBarService} from "./shared/components/snack-bar/snack-bar.service";
import {SpinnerStoreService} from "./core/state/spinner-store.service";
import {CourseService} from "./core/services/course.service";
import {CategorieService} from "./core/services/categorie.service";
import {CategoriesStoreService} from "./core/state/categories-store.service";
import {CourseStoreService} from "./core/state/course-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-course';
  isSpinner: boolean;

  constructor(private _snackBarService: SnackBarService,
              private _spinnerStore: SpinnerStoreService,
              private _courseService: CourseService,
              private _categorieService: CategorieService,
              private _categoriesStore: CategoriesStoreService,
              private _courseStore: CourseStoreService) {

    this.isSpinner = false;


    this._spinnerStore.spinner$.subscribe(
      (data) => setTimeout(() => {
        this.isSpinner = data
      }, 0)
    );
  }

  ngOnInit(): void {

  }


}

import {Component} from '@angular/core';
import {CourseService} from "../../core/services/course.service";
import {CategorieService} from "../../core/services/categorie.service";
import {CategoriesStoreService} from "../../core/state/categories-store.service";
import {CourseStoreService} from "../../core/state/course-store.service";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {


  constructor(private _courseService: CourseService,
              private _categorieService: CategorieService,
              private _categoriesStore: CategoriesStoreService,
              private _courseStore: CourseStoreService,
              private _spinnerStore: SpinnerStoreService) {
  }

}

import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../core/services/course.service";
import {CategorieService} from "../../core/services/categorie.service";
import {forkJoin} from "rxjs";
import {CategoriesStoreService} from "../../core/state/categories-store.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private _courseService: CourseService,
              private _categorieService: CategorieService,
              private _categoriesStore: CategoriesStoreService) {
  }

  ngOnInit(): void {
    forkJoin(
      {
        categories: this._categorieService.getCategories(),
        listeCourse: this._courseService.getListeCourse()
      }
    ).toPromise()
      .then((data) => {
        console.log(data);
        this._categoriesStore.setCategories(data.categories);
      });
  }

}

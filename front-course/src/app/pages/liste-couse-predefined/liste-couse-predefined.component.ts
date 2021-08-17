import {Component, OnInit} from '@angular/core';
import {PreDefinedCourseService} from "../../core/services/pre-defined-course.service";
import {
  ItemCourseDetails,
  itemCourseTabToListeCourseDetailsTab,
  ListeCourseDetails
} from "../../shared/utils/course-utils";
import {ItemCourse} from "../../core/models/item-course";
import {firstValueFrom, map, Observable} from "rxjs";
import {PreDefinedCourseStoreService} from "../../core/state/pre-defined-course-store.service";
import {CategoriesStoreService} from "../../core/state/categories-store.service";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";

@Component({
  selector: 'app-liste-couse-predefined',
  templateUrl: './liste-couse-predefined.component.html',
  styleUrls: ['./liste-couse-predefined.component.css']
})
export class ListeCousePredefinedComponent implements OnInit {

  listeCourseDetails$: Observable<ListeCourseDetails[]>;

  messageError: string | undefined;


  constructor(private preDefinedCourseService: PreDefinedCourseService,
              private preDefinedCourseStore: PreDefinedCourseStoreService,
              private _categoriesStore: CategoriesStoreService,
              private _spinnerStore: SpinnerStoreService) {
    this.listeCourseDetails$ = this.preDefinedCourseStore.course$
      .pipe(map(itemCourses => {
          console.log(itemCourses);
          return itemCourseTabToListeCourseDetailsTab(itemCourses, this._categoriesStore.getCategories());
        }
      ));
  }

  ngOnInit(): void {
    this._spinnerStore.setSpinner(true)
    firstValueFrom(this.preDefinedCourseService.getPreDefinedListeCours())
      .then((itemCourses) => this.preDefinedCourseStore.setCourse(itemCourses))
      .catch(() => this.messageError = "Problème de communication avec le serveur")
      .finally(() => this._spinnerStore.setSpinner(false));
    console.log('ici')
  }


  addQuantityItemCourse(produit: ItemCourseDetails): void {
    let itemCourse: ItemCourse = new ItemCourse(produit.idItemCourse, produit.idProduit, produit.quantite + 1);
    this._updateItemInListCourse(itemCourse);
  }

  lessQuantityItemCourse(produit: ItemCourseDetails): void {
    let itemCourse: ItemCourse = new ItemCourse(produit.idItemCourse, produit.idProduit, produit.quantite - 1);
    this._updateItemInListCourse(itemCourse);
  }

  deleteItemCourse(idItemCourse: number): void {
    /*firstValueFrom(this._courseService.deleteItemCourseInList(idItemCourse))
      .then(() => {
        this._courseStore.deleteItemInCourse(idItemCourse);
        this._messageStore.setMessage({
          message: 'Le produit a été supprimé de la liste de course',
          colorTexte: 'white'
        });
      })*/
  }


  private _updateItemInListCourse(itemCourseUpdate: ItemCourse): void {
    /*firstValueFrom(this._courseService.updateItemCourseInList(itemCourseUpdate))
      .then((data) => {
        this._courseStore.updateCourse(data);
        this._messageStore.setMessage({
          message: 'Le produit a été mis à jour dans la liste de course',
          colorTexte: 'white'
        });
      })
      .catch((error) => {
        switch (error.status) {
          case 404:
            this._messageStore.setMessage({
              message: 'Ce produit n\'existe pas dans la liste de course',
              colorTexte: 'red'
            });
            break;
          case 412:
            this._messageStore.setMessage({message: 'Ce produit n\'existe pas', colorTexte: 'red'});
            break;
          case 409:
            this._messageStore.setMessage({message: 'Ce produit est déjà dans la liste de course', colorTexte: 'red'});
            break;
          default :
            this._messageStore.setMessage({
              message: 'Une erreur est survenue lors de la modification de la liste de course',
              colorTexte: 'red'
            });
            break;
        }
      });*/
  }

}

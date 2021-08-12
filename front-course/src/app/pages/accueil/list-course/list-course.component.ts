import {Component, OnInit} from '@angular/core';
import {firstValueFrom, map, Observable, of} from "rxjs";
import {
  ItemCourseDetails,
  itemCourseTabToListeCourseDetailsTab,
  ListeCourseDetails
} from "../../../shared/utils/course-utils";
import {CourseStoreService} from "../../../core/state/course-store.service";
import {CategoriesStoreService} from "../../../core/state/categories-store.service";
import {ItemCourse} from "../../../core/models/item-course";
import {CourseService} from "../../../core/services/course.service";
import {MessageStoreService} from "../../../core/state/message-store.service";

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  listeCourseDetails$: Observable<ListeCourseDetails[]> = of([]);

  constructor(private _courseService: CourseService,
              private _courseStore: CourseStoreService,
              private _categoriesStore: CategoriesStoreService,
              private _messageStore: MessageStoreService) {
  }

  ngOnInit(): void {
    this.listeCourseDetails$ = this._courseStore.course$
      .pipe(
        map(itemCourses =>
          itemCourseTabToListeCourseDetailsTab(itemCourses, this._categoriesStore.getCategories()))
      );
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
    firstValueFrom(this._courseService.deleteItemCourseInList(idItemCourse))
      .then(() => {
        this._courseStore.deleteItemInCourse(idItemCourse);
        this._messageStore.setMessage({
          message: 'Le produit a été supprimé de la liste de course',
          colorTexte: 'white'
        });
      })
  }


  private _updateItemInListCourse(itemCourseUpdate: ItemCourse): void {
    firstValueFrom(this._courseService.updateItemCourseInList(itemCourseUpdate))
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
      });
  }

}

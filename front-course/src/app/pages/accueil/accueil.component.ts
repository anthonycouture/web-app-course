import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../core/services/course.service";
import {CategorieService} from "../../core/services/categorie.service";
import {CategoriesStoreService} from "../../core/state/categories-store.service";
import {CourseStoreService} from "../../core/state/course-store.service";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";
import {firstValueFrom, forkJoin, map, Observable} from "rxjs";
import {
  ItemCourseDetails,
  itemCourseTabToListeCourseDetailsTab,
  ListeCourseDetails
} from "../../shared/utils/course-utils";
import {ItemCourse} from "../../core/models/item-course";
import {MessageStoreService} from "../../core/state/message-store.service";
import {DialogAddProduitInListComponent} from "../../shared/dialog/dialog-add-produit-in-list/dialog-add-produit-in-list.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {


  listeCourseDetails$: Observable<ListeCourseDetails[]>;

  messageError: string | undefined;


  constructor(private _courseService: CourseService,
              private _categorieService: CategorieService,
              private _categoriesStore: CategoriesStoreService,
              private _courseStore: CourseStoreService,
              private _spinnerStore: SpinnerStoreService,
              private _messageStore: MessageStoreService,
              private _dialog: MatDialog) {
    this.listeCourseDetails$ = this._courseStore.course$
      .pipe(
        map(itemCourses =>
          itemCourseTabToListeCourseDetailsTab(itemCourses, this._categoriesStore.getCategories()))
      );
  }

  ngOnInit(): void {
    this._spinnerStore.setSpinner(true);
    firstValueFrom(forkJoin(
      [
        this._categorieService.getCategories(),
        this._courseService.getListeCourse()
      ]
    ))
      .then((result) => {
        this._categoriesStore.setCategories(result[0]);
        this._courseStore.setCourse(result[1]);
      }).catch(() => this.messageError = 'Problème de communication avec le serveur')
      .finally(() => this._spinnerStore.setSpinner(false))
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


  openDialogAddProduitInList(): void {
    this._dialog.open(DialogAddProduitInListComponent, {
      width: '350px',
    });
  }

}

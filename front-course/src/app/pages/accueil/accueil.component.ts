import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../core/services/course.service";
import {CategorieService} from "../../core/services/categorie.service";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";
import {firstValueFrom, forkJoin} from "rxjs";
import {ItemCourse} from "../../core/models/item-course";
import {MessageStoreService} from "../../core/state/message-store.service";
import {MatDialog} from "@angular/material/dialog";
import {Categorie} from "../../core/models/categorie";
import {DialogAddProduitInListComponent} from "../../shared/dialog/dialog-add-produit-in-list/dialog-add-produit-in-list.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  categories: Categorie[];
  itemsCourse: ItemCourse[];

  messageError: string | undefined;


  constructor(private _courseService: CourseService,
              private _categorieService: CategorieService,
              private _spinnerStore: SpinnerStoreService,
              private _messageStore: MessageStoreService,
              private _dialog: MatDialog) {

    this.categories = [];
    this.itemsCourse = [];

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
        this.categories = result[0];
        this.itemsCourse = result[1];
      }).catch(() => this.messageError = 'Problème de communication avec le serveur')
      .finally(() => this._spinnerStore.setSpinner(false))
  }


  addQuantityItemCourse(idItemCourse: number): void {
    const itemCourse: ItemCourse | undefined = this.itemsCourse.find(item => item.id === idItemCourse);
    if (!!itemCourse) {
      itemCourse.quantite += 1;
      this._updateItemInListCourse(itemCourse);
    }
  }

  lessQuantityItemCourse(idItemCourse: number): void {
    const itemCourse: ItemCourse | undefined = this.itemsCourse.find(item => item.id === idItemCourse);
    if (!!itemCourse) {
      itemCourse.quantite -= 1;
      this._updateItemInListCourse(itemCourse);
    }
  }

  deleteItemCourse(idItemCourse: number): void {
    firstValueFrom(this._courseService.deleteItemCourseInList(idItemCourse))
      .then(() => {
        this.itemsCourse = this.itemsCourse.filter(item => item.id !== idItemCourse);
        this._messageStore.setMessage({
          message: 'Le produit a été supprimé de la liste de course',
          colorTexte: 'white'
        });
      })
  }


  private _updateItemInListCourse(itemCourseUpdate: ItemCourse): void {
    firstValueFrom(this._courseService.updateItemCourseInList(itemCourseUpdate))
      .then((data) => {
        this.itemsCourse = this.itemsCourse.map((item) => item.id === data.id ? data : item);
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
        }
      });
  }


  openDialogAddProduitInList(): void {
    const dialogRef = this._dialog.open(DialogAddProduitInListComponent, {
      width: '350px',
      data: {categories: this.categories, listType: 'list'}
    });

    firstValueFrom(dialogRef.afterClosed()).then(result => {
      if (!!result && result !== false) {
        this.itemsCourse = [...this.itemsCourse, result]
      }
    });
  }

}

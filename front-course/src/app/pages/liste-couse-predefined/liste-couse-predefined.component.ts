import {Component, OnInit} from '@angular/core';
import {PreDefinedCourseService} from "../../core/services/pre-defined-course.service";
import {
  ItemCourseDetails,
  itemCourseTabToListeCourseDetailsTab,
  ListeCourseDetails
} from "../../shared/utils/course-utils";
import {ItemCourse} from "../../core/models/item-course";
import {firstValueFrom, forkJoin} from "rxjs";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";
import {MessageStoreService} from "../../core/state/message-store.service";
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";

@Component({
  selector: 'app-liste-couse-predefined',
  templateUrl: './liste-couse-predefined.component.html',
  styleUrls: ['./liste-couse-predefined.component.css']
})
export class ListeCousePredefinedComponent implements OnInit {

  // TODO faire un pipe pour supprimer ce champs qu'on doit refresh à chaque fois
  listeCoursePreDetails: ListeCourseDetails[];

  private _listCategorie: Categorie[];
  private _listeItemCoursePre: ItemCourse[];

  messageError: string | undefined;


  constructor(private _preDefinedCourseService: PreDefinedCourseService,
              private _categorieService: CategorieService,
              private _spinnerStore: SpinnerStoreService,
              private _messageStore: MessageStoreService) {
    this.listeCoursePreDetails = [];
    this._listCategorie = [];
    this._listeItemCoursePre = [];
  }

  ngOnInit(): void {
    this._spinnerStore.setSpinner(true)
    firstValueFrom(forkJoin([
        this._preDefinedCourseService.getPreDefinedListeCourse(),
        this._categorieService.getCategories()
      ]
    ))
      .then((result) => {
        this._listCategorie = result[1];
        this._listeItemCoursePre = result[0];
        this._updateView();
      })
      .catch(() => this.messageError = "Problème de communication avec le serveur")
      .finally(() => this._spinnerStore.setSpinner(false));
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
    firstValueFrom(this._preDefinedCourseService.deleteItemCoursePreDefinedListe(idItemCourse))
      .then(() => {
        this._listeItemCoursePre = this._listeItemCoursePre.filter((item) => item.id !== idItemCourse);
        this._updateView();
        this._messageStore.setMessage({
          message: 'Le produit a été supprimé de la liste de course',
          colorTexte: 'white'
        });
      })
  }


  private _updateItemInListCourse(itemCourseUpdate: ItemCourse): void {
    firstValueFrom(this._preDefinedCourseService.updateItemCoursePreDefinedListe(itemCourseUpdate))
      .then((data) => {
        this._listeItemCoursePre = this._listeItemCoursePre.map((item) => item.id !== data.id ? item : data);
        this._updateView();
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

  private _updateView() {
    this.listeCoursePreDetails = itemCourseTabToListeCourseDetailsTab(this._listeItemCoursePre, this._listCategorie);
  }

}

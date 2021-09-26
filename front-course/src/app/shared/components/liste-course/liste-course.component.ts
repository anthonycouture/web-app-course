import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ItemCourse} from "../../../core/models/item-course";
import {Categorie} from "../../../core/models/categorie";

interface ListeCourseDetails {
  idCategorie: number;
  nomCategorie: string;
  produits: ItemCourseDetails[];
}

interface ItemCourseDetails {
  idItemCourse: number;
  idProduit: number;
  nomProduit: string;
  quantite: number;
}

@Component({
  selector: 'app-liste-course',
  templateUrl: './liste-course.component.html',
  styleUrls: ['./liste-course.component.css']
})
export class ListeCourseComponent implements OnChanges {

  @Input() itemsCourse: ItemCourse[];

  @Input() categories: Categorie[];

  @Output() addQuantityItemCourse = new EventEmitter<number>();

  @Output() lessQuantityItemCourse = new EventEmitter<number>();

  @Output() deleteItemCourse = new EventEmitter<number>();

  listeCourseDetails: ListeCourseDetails[];

  constructor() {
    this.listeCourseDetails = [];
    this.itemsCourse = [];
    this.categories = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listeCourseDetails = this.itemCourseTabToListeCourseDetailsTab(this.itemsCourse, this.categories);
  }

  itemCourseTabToListeCourseDetailsTab(itemCourses: ItemCourse[], categories: Categorie[]): ListeCourseDetails[] {
    let response: ListeCourseDetails[] = [];

    itemCourses.forEach((itemCourse) => {
      categories.every((categorie) => {
        return categorie.produits.every((produit) => {
          if (produit.id === itemCourse.idProduit) {
            let listeCourseDetails: ListeCourseDetails = response
                .find(listeCourseDetails => listeCourseDetails.idCategorie === categorie.id)
              || {
                idCategorie: categorie.id,
                nomCategorie: categorie.nom,
                produits: []
              };
            if (listeCourseDetails.produits.length === 0)
              response.push(listeCourseDetails);
            listeCourseDetails.produits.push({
              idItemCourse: itemCourse.id,
              idProduit: produit.id,
              nomProduit: produit.nom,
              quantite: itemCourse.quantite
            });
            return false;
          }
          return true;
        });
      });
    });

    response.sort((a, b) => a.nomCategorie.localeCompare(b.nomCategorie));

    response.forEach((item) =>
      item.produits.sort((a, b) => a.nomProduit.localeCompare(b.nomProduit))
    );


    return response;
  }


}

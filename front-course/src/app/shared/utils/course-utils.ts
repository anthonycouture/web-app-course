import {ItemCourse} from "../../core/models/item-course";
import {Categorie} from "../../core/models/categorie";

export interface ListeCourseDetails {
  idCategorie: number;
  nomCategorie: string;
  produits: ItemCourseDetails[];
}

export interface ItemCourseDetails {
  idItemCourse: number;
  idProduit: number;
  nomProduit: string;
  quantite: number;
}


export function itemCourseTabToListeCourseDetailsTab(itemCourses: ItemCourse[], categories: Categorie[]): ListeCourseDetails[] {
  let response: ListeCourseDetails[] = [];

  itemCourses.forEach((itemCourse) => {
    categories.every((categorie) => {
      return categorie.produits?.every((produit) => {
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


  return response;
}

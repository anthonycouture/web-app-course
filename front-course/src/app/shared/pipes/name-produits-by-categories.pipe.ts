import {Pipe, PipeTransform} from '@angular/core';
import {Categorie} from "../../core/models/categorie";

@Pipe({
  name: 'nameProduitsByCategories'
})
export class NameProduitsByCategoriesPipe implements PipeTransform {

  transform(value: Categorie[]): string[] {
    let listOption: string [] = [];
    value.forEach(categorie => {
      categorie.produits?.forEach(produit => listOption.push(produit.nom))
    });
    return listOption;
  }

}

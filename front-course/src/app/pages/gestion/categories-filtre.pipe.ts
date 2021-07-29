import {Pipe, PipeTransform} from '@angular/core';
import {Categorie} from "../../core/models/categorie";

@Pipe({
  name: 'categoriesFiltre'
})
export class CategoriesFiltrePipe implements PipeTransform {

  transform(value: Categorie[], filtreNameProduit: string[]): Categorie[] {
    if (filtreNameProduit.length === 0)
      return value;
    let valueFilter: Categorie[] = [];

    value.forEach(categorie => {
        let categorieFiltrer = JSON.parse(JSON.stringify(categorie));
        categorieFiltrer.produits = categorie.produits?.filter(produit => {
          let nomProduit = produit.nom.toLowerCase();
          let responseFilter = false;
          filtreNameProduit.forEach(value => {
              if (nomProduit === value.toLowerCase()) {
                responseFilter = true;
                return;
              }
            }
          );
          return responseFilter;
        });
        valueFilter.push(categorieFiltrer);
      }
    );
    console.log(valueFilter)
    return valueFilter;
  }

}

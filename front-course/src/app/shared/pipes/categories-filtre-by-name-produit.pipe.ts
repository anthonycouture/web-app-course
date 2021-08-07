import {Pipe, PipeTransform} from '@angular/core';
import {Categorie} from "../../core/models/categorie";

@Pipe({
  name: 'categoriesFiltreByNameProduit'
})
export class CategoriesFiltreByNameProduitPipe implements PipeTransform {

  transform(value: Categorie[], filtreNameProduit: string[]): Categorie[] {
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
    return valueFilter;
  }

}

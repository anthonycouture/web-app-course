import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {CategoriesStoreService} from "../../core/state/categories-store.service";

@Injectable({providedIn: 'root'})
export class NameProduitExistValidator {


  constructor(private _categoriesStore: CategoriesStoreService) {

  }


  validate(idProduit: number | null): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {

      let exist = false;

      this._categoriesStore.getCategories().forEach((categorie) =>
        categorie.produits.forEach(produit => {
          if (produit.nom === ctrl.value && (idProduit === null || idProduit !== produit.id)) {
            exist = true;
            return;
          }
        })
      );

      return exist ? {notValid: true} : null;
    }
  }
}



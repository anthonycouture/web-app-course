import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {CategoriesStoreService} from "../../core/state/categories-store.service";

@Injectable({providedIn: 'root'})
export class NameCategorieExistValidator {

  constructor(private _categoriesStore: CategoriesStoreService) {
  }


  validate(idCategorie: number | null): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {
      let exist = false;
      this._categoriesStore.getCategories().forEach(categorie => {
        if (categorie.nom === ctrl.value && (idCategorie === null || idCategorie !== categorie.id)) {
          exist = true;
          return;
        }
      });

      return exist ? {notValid: true} : null;
    }
  }
}



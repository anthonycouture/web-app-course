import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Categorie} from "../../core/models/categorie";

@Injectable({providedIn: 'root'})
export class NameCategorieExistValidator {


  validate(idCategorie: number | null, categories: Categorie[]): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {
      let exist = false;
      categories.forEach(categorie => {
        if (categorie.nom === ctrl.value && (idCategorie === null || idCategorie !== categorie.id)) {
          exist = true;
          return;
        }
      });

      return exist ? {notValid: true} : null;
    }
  }
}



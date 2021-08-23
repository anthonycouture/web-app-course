import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Categorie} from "../../core/models/categorie";

@Injectable({providedIn: 'root'})
export class NameProduitExistValidator {


  validate(idProduit: number | null, categories: Categorie[]): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {

      let exist = false;


      categories.forEach((categorie) =>
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



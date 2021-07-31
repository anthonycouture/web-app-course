import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Produit} from "../../core/models/produit";
import {CategoriesStoreService} from "../../core/state/categories-store.service";

@Injectable({providedIn: 'root'})
export class NameProduitExistValidator {

  private _produits: Produit[] = [];

  constructor(private _categoriesStore: CategoriesStoreService) {
    // @ts-ignore
    this._categoriesStore.categories$.subscribe(
      (data) => this._produits = data
    );
  }


  validate(idProduit: number | null): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {
      let exist = false;
      this._produits.forEach(produit => {
        if (produit.nom === ctrl.value && (idProduit === null || idProduit !== produit.id)) {
          exist = true;
          return;
        }
      });

      return exist ? {notValid: true} : null;
    }
  }
}



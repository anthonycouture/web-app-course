import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectProduits} from "../../core/state/categorie.selector";
import {Produit} from "../../core/models/produit";

@Injectable({providedIn: 'root'})
export class NameProduitExistValidator {

  private _produits: Produit[] = [];

  constructor(private _store: Store) {
    // @ts-ignore
    this._store.select(selectProduits).subscribe(
      (data) => this._produits = data
    );
  }


  validate(idProduit: number | null): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {
      let exist = false;
      this._produits.forEach(produit => {
        if (produit.nom === ctrl.value && (idProduit === null || idProduit !== produit.id))
          exist = true;
      });

      if (exist)
        return {notValid: true};

      return null;
    }
  }
}



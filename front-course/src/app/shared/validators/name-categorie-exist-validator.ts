import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectCategories} from "../../core/state/categorie.selector";
import {Categorie} from "../../core/models/categorie";

@Injectable({providedIn: 'root'})
export class NameCategorieExistValidator {

  private _categories: Categorie[] = [];

  constructor(private _store: Store) {
    // @ts-ignore
    this._store.select(selectCategories).subscribe(
      (data) => this._categories = data
    );
  }


  validate(idCategorie: number | null): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {
      let exist = false;
      this._categories.forEach(categorie => {
        if (categorie.nom === ctrl.value && (idCategorie === null || idCategorie !== categorie.id)) {
          exist = true;
          return;
        }
      });

      return exist ? {notValid: true} : null;

    }
  }
}



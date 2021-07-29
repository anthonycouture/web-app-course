import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectCategories} from "../../core/state/categorie/categories.selector";
import {Categorie} from "../../core/models/categorie";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class NameCategorieExistValidator {

  // @ts-ignore
  private _categories$: Observable<Categorie[]> = this._store.select(selectCategories);

  constructor(private _store: Store) {
  }


  validate(idCategorie: number | null): ValidatorFn {
    return (
      ctrl: AbstractControl
    ): ValidationErrors | null => {
      let exist = false;
      this._categories$.pipe(take(1)).subscribe((categories) => {
          categories.forEach(categorie => {
            if (categorie.nom === ctrl.value && (idCategorie === null || idCategorie !== categorie.id)) {
              exist = true;
              return;
            }
          });
        }
      );
      return exist ? {notValid: true} : null;
    }
  }
}



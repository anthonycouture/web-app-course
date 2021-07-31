import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Categorie} from "../../core/models/categorie";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {CategoriesStoreService} from "../../core/state/categories-store.service";

@Injectable({providedIn: 'root'})
export class NameCategorieExistValidator {

  // @ts-ignore
  private _categories$: Observable<Categorie[]> = this._categoriesStore.categories$;

  constructor(private _categoriesStore: CategoriesStoreService) {
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



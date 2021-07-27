import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {delay} from "rxjs/operators";
import {selectProduits} from "../../core/state/categorie.selector";
import {Produit} from "../../core/models/produit";

@Injectable({providedIn: 'root'})
export class ProduitExistValidator implements AsyncValidator {

  private _produits: Produit[] = [];

  constructor(private _store: Store) {
    // @ts-ignore
    this._store.select(selectProduits).subscribe(
      (data) => this._produits = data
    );
  }


  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    console.log('validator')
    let exist = false;
    this._produits.forEach(produit => {
      if (produit.nom === ctrl.value)
        exist = true;
    })
    if (exist)
      return of({valid: false}).pipe(delay(3000));

    return of(null).pipe(delay(3000));
  }
}



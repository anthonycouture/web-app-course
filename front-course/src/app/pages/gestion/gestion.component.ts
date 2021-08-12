import {Component} from '@angular/core';
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";
import {map, Observable} from "rxjs";
import {CategoriesStoreService} from "../../core/state/categories-store.service";
import {SpinnerStoreService} from "../../core/state/spinner-store.service";
import {MessageStoreService} from "../../core/state/message-store.service";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {

  categories$: Observable<Categorie[]>;

  listOption: string[];

  listNameProduit$: Observable<string[]>;

  constructor(private _categorieService: CategorieService,
              private _messageStore: MessageStoreService,
              private _categoriesStore: CategoriesStoreService,
              private _spinnerStore: SpinnerStoreService) {
    this.categories$ = this._categoriesStore.categories$;
    this.listNameProduit$ = this._categoriesStore.categories$.pipe(
      map((categories) => {
        let listOption: string [] = [];
        categories.forEach(categorie => {
          categorie.produits?.forEach(produit => listOption.push(produit.nom))
        });
        return listOption;
      })
    );
    this.listOption = [];
  }

}

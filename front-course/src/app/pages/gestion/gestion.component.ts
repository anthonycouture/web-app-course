import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";
import {addMessage} from "../../core/state/message/message.action";
import {Observable} from "rxjs";
import {updateSpinner} from "../../core/state/spinner/spinner.action";
import {CategoriesStoreService} from "../../core/state/categories-store.service";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  // @ts-ignore
  categories$: Observable<Categorie[]> = this._categoriesStore.categories$;

  listOption: string[] = [];

  constructor(private _categorieService: CategorieService,
              private _store: Store,
              private _categoriesStore: CategoriesStoreService) {

  }

  ngOnInit(): void {
    this._store.dispatch(updateSpinner({etat: true}));
    this._categorieService.getCategories().toPromise().then(
      (data) => {
        this._categoriesStore.setCategories(data);
      },
      () => {
        this._store.dispatch(addMessage({
          message: {
            message: 'Problème lors de la récupération des catégories et produits',
            colorTexte: 'red'
          }
        }));
        this._store.dispatch(updateSpinner({etat: false}))
      }
    );

  }
}

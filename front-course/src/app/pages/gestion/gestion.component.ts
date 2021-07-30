import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCategories} from "../../core/state/categorie/categories.selector";
import {retrievedCategories} from "../../core/state/categorie/categories.action";
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";
import {addMessage} from "../../core/state/message/message.action";
import {Observable} from "rxjs";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  // @ts-ignore
  categories$: Observable<Categorie[]> = this._store.select(selectCategories);

  listOption: string[] = [];

  constructor(private _categorieService: CategorieService,
              private _store: Store) {

  }

  ngOnInit(): void {
    this._categorieService.getCategories().toPromise().then(
      (data) => {
        this._store.dispatch(retrievedCategories({categories: data}));
      },
      () => this._store.dispatch(addMessage({
          message: {
            message: 'Problème lors de la récupération des catégories et produits',
            colorTexte: 'red'
          }
        }
      ))
    );
  }
}

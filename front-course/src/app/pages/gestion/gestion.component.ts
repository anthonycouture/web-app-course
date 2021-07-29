import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCategories} from "../../core/state/categorie/categories.selector";
import {retrievedCategories} from "../../core/state/categorie/categories.action";
import {CategorieService} from "../../core/services/categorie.service";
import {Categorie} from "../../core/models/categorie";
import {addMessage} from "../../core/state/message/message.action";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  private _categoriesFull: Categorie[] = [];
  categoriesFiltrer: Categorie[] = [];

  listOption: string[] = [];

  constructor(private _categorieService: CategorieService,
              private _store: Store) {
    // @ts-ignore
    this._store.select(selectCategories).subscribe(
      (data) => {
        this._categoriesFull = data;
        this.categoriesFiltrer = data;
        data.forEach(categorie => {
          categorie.produits?.forEach(produit => this.listOption.push(produit.nom))
        });
      }
    );
  }

  ngOnInit(): void {
    this._categorieService.getCategories().subscribe(
      (data) => {
        this._store.dispatch(retrievedCategories({categories: data}));
      },
      () => this._store.dispatch(addMessage({
        message: {
          message: 'Problème lors de la récupération des catégories et produits',
          colorTexte: 'red'
        }
      }))
    );
  }

  filterByOption(valueTab: string[]): void {
    this.categoriesFiltrer = [];
    this._categoriesFull.forEach(categorie => {
        let categorieFiltrer = JSON.parse(JSON.stringify(categorie));
        categorieFiltrer.produits = categorie.produits?.filter(produit => {
          let nomProduit = produit.nom.toLowerCase();
          let responseFilter = false;
          valueTab.forEach(value => {
              if (nomProduit === value.toLowerCase()) {
                responseFilter = true;
                return;
              }
            }
          );
          return responseFilter;
        });
        this.categoriesFiltrer.push(categorieFiltrer);
      }
    );
  }
}

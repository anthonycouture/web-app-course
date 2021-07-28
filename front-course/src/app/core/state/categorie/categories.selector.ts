import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {Categorie} from "../../models/categorie";
import {Produit} from "../../models/produit";

export const selectCategories = createSelector(
  (state: AppState) => state.categories,
  (categories: Categorie[]) => categories
);

export const selectProduits = createSelector(
  (state: AppState) => state.categories,
  (categories: Categorie[]) => {
    let produits: Produit[] = [];
    for (let categorie of categories) {
      if (categorie.produits !== undefined)
        produits = produits.concat(categorie.produits);
    }
    return produits;
  }
);

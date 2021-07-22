import {Action, createReducer, on} from "@ngrx/store";
import {
  addCategorieInList,
  deleteCategorieInList,
  deleteProduitInList,
  retrievedCategories,
  updateCategorieInList,
  updateProduitInList
} from "./categorie.action";
import {Categorie} from "../models/categorie";


const _initialState: Categorie[] = [];

const _categoriesReducer = createReducer(
  _initialState,
  on(retrievedCategories, (state, {categories}) => categories),
  on(deleteCategorieInList, (state, {idCategorie}) => state.filter(item => item.id !== idCategorie)),
  on(addCategorieInList, (state, {categorie}) => [...state, categorie]),
  on(updateCategorieInList, (state, {categorie}) => {
    return state.map(item => item.id === categorie.id ? categorie : item);
  }),
  on(deleteProduitInList, (state, {idProduit}) => {
    return state.map(categorie => {
      let categorieUpdate = Object.assign({}, categorie);
      categorieUpdate.produits = categorieUpdate.produits?.filter(item => item.id !== idProduit)
      return categorieUpdate;
    });
  }),
  on(updateProduitInList, (state, {idCategorie, produit}) => {
    return state.map(categorieState => {
      let categorieUpdate = Object.assign({}, categorieState);
      categorieUpdate.produits = categorieState.produits?.filter(item => item.id !== produit.id)
      if (categorieUpdate.id === idCategorie) {
        let produitsCategorieState = categorieUpdate.produits ?? [];
        produitsCategorieState.push(produit)
      }
      return categorieUpdate;
    })
  })
);


export function reducer(state: Categorie[] | undefined, action: Action) {
  return _categoriesReducer(state, action);
}

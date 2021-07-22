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
  on(deleteCategorieInList, (state, {categorie}) => state.filter(item => JSON.stringify(item) !== JSON.stringify(categorie))),
  on(addCategorieInList, (state, {categorie}) => [...state, categorie]),
  on(updateCategorieInList, (state, {categorie}) => {
    return state.map(item => {
      if (item.id === categorie.id) {
        item = categorie;
      }
      return item;
    })
  }),
  on(deleteProduitInList, (state, {produit}) => {
    return state.map(categorie => {
      categorie.produits = categorie.produits?.filter(item => item !== produit)
      return categorie;
    });
  }),
  on(updateProduitInList, (state, {categorie, produit}) => {
    return state.map(categorieState => {
      categorieState.produits = categorieState.produits?.filter(item => item.id !== produit.id)
      if (categorieState === categorie) {
        console.log(categorieState.nom + ' ' + categorie.nom);
        let produitsCategorieState = categorieState.produits ?? [];
        produitsCategorieState.push(produit)
      }
      return categorieState;
    })
  })
);


export function reducer(state: Categorie[] | undefined, action: Action) {
  return _categoriesReducer(state, action);
}

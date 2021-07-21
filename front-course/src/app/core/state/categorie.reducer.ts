import {Action, createReducer, on} from "@ngrx/store";
import {
  addCategorieInList,
  deleteCategorieInList,
  deleteProduitInCategorie,
  retrievedCategories,
  updateCategorieInList
} from "./categorie.action";
import {Categorie} from "../models/categorie";


const initialState: Categorie[] = [];

const categoriesReducer = createReducer(
  initialState,
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
  on(deleteProduitInCategorie, (state, {produit}) => {
    return state.map(categorie => {
      categorie.produits = categorie.produits?.filter(item => item !== produit)
      return categorie;
    });
  })
);


export function reducer(state: Categorie[] | undefined, action: Action) {
  return categoriesReducer(state, action);
}

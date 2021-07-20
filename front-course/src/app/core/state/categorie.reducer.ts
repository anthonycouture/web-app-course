import {Action, createReducer, on} from "@ngrx/store";
import {
  addCategorieInList,
  deleteCategorieInList,
  retrievedCategories,
  updateCategorieInList
} from "./categorie.action";
import {Categorie} from "../models/categorie";


const initialState: Categorie[] = [];

const categoriesReducer = createReducer(
  initialState,
  on(retrievedCategories, (state, {categories}) => categories),
  on(deleteCategorieInList, (state, {categorie}) => state.filter(item => item !== categorie)),
  on(addCategorieInList, (state, {categorie}) => [...state, categorie]),
  on(updateCategorieInList, (state, {categorie}) => {
    return state.map(item => {
      if (item.id === categorie.id) {
        item = categorie;
      }
      return item;
    })
  }),
);


export function reducer(state: Categorie[] | undefined, action: Action) {
  return categoriesReducer(state, action);
}

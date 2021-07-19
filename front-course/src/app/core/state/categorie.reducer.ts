import {createReducer, on} from "@ngrx/store";
import {deleteCategorieInList, retrievedCategories} from "./categorie.action";
import {Categorie} from "../models/categorie";


export const initialState: Categorie[] = [];

export const categoriesReducer = createReducer(
  initialState,
  on(retrievedCategories, (state, {categories}) => categories),
  on(deleteCategorieInList, (state, {categorie}) => state.filter(item => item !== categorie))
);

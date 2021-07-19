import {createAction, props} from "@ngrx/store";
import {Categorie} from "../models/categorie";

export const retrievedCategories = createAction(
  'Init de la liste de categories',
  props<{ categories: Categorie[] }>()
);


export const deleteCategorieInList = createAction(
  'Supprime un produit de la liste',
  props<{ categorie: Categorie }>()
);

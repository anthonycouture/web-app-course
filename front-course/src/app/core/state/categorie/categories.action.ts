import {createAction, props} from "@ngrx/store";
import {Categorie} from "../../models/categorie";
import {Produit} from "../../models/produit";

export const retrievedCategories = createAction(
  'Init de la liste de categories',
  props<{ categories: Categorie[] }>()
);


export const deleteCategorieInList = createAction(
  'Supprime une categorie de la liste',
  props<{ idCategorie: number }>()
);

export const addCategorieInList = createAction(
  'Ajoute une categorie à la liste',
  props<{ categorie: Categorie }>()
);

export const updateCategorieInList = createAction(
  'Met à jour une categorie de la liste',
  props<{ categorie: Categorie }>()
)

export const deleteProduitInList = createAction(
  'Supprime un produit dans une catégorie',
  props<{ idProduit: number }>()
)

export const updateProduitInList = createAction(
  'Met à jour un produit dans la liste',
  props<{ idCategorie: number, produit: Produit }>()
)

export const addProduitInList = createAction(
  'Ajoute un produit dans la liste',
  props<{ idCategorie: number, produit: Produit }>()
)

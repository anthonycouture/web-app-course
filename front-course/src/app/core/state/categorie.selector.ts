import {createSelector, MemoizedSelector} from "@ngrx/store";
import {AppState} from "./app.state";
import {Categorie} from "../models/categorie";

export const selectCategories: MemoizedSelector<AppState, Categorie[]> = createSelector(
  (state: AppState) => state.categories,
  (categories: Categorie[]) => categories
);

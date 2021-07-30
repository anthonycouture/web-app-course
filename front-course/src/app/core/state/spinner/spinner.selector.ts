import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";

export const selectEtatSpinner = createSelector(
  (state: AppState) => state.spinner,
  (spinner: boolean) => spinner
)

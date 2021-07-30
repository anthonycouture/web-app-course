import {createAction, props} from "@ngrx/store";

export const updateSpinner = createAction(
  'update spinner',
  props<{ etat: boolean }>()
);

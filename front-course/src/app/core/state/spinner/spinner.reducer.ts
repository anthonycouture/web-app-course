import {Action, createReducer, on} from "@ngrx/store";
import {updateSpinner} from "./spinner.action";

const _initialState: boolean = false;

const _spninnerReducer = createReducer(
  _initialState,
  on(updateSpinner, (state, {etat}) => etat)
);

export function spinnerReducer(state: boolean | undefined, action: Action) {
  return _spninnerReducer(state, action);
}

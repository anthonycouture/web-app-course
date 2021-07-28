import {createAction, props} from "@ngrx/store";
import {Message} from "../app.state";

export const addMessage = createAction(
  'Ajoute un message à afficher',
  props<{ message: Message }>()
);

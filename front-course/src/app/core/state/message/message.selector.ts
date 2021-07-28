import {createSelector} from "@ngrx/store";
import {AppState, Message} from "../app.state";

export const selectMessages = createSelector(
  (state: AppState) => state.message,
  (message: Message) => message
)

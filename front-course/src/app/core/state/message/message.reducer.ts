import {Message} from "../app.state";
import {Action, createReducer, on} from "@ngrx/store";
import {addMessage} from "./message.action";

const _initialState: Message = {message: 'Bienvenue', level: 'info'};

const _messageReducer = createReducer(
  _initialState,
  on(addMessage, (state, {message}) => message),
);


export function messageReducer(state: Message | undefined, action: Action) {
  return _messageReducer(state, action);
}

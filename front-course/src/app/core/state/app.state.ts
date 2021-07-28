import {Categorie} from "../models/categorie";

export interface Message {
  message: String;
  level: 'info' | 'warn' | 'error'
}

export interface AppState {
  categories: Categorie[];
  message: Message;
}

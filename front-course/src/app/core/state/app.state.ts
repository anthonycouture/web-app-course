import {Categorie} from "../models/categorie";

export interface Message {
  message: String;
  colorTexte: 'white' | 'orange' | 'red'
}

export interface AppState {
  categories: Categorie[];
  message: Message;
  spinner: boolean;
}

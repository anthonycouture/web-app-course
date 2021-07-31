export interface Message {
  message: String;
  colorTexte: 'white' | 'orange' | 'red'
}

export interface AppState {
  message: Message;
}

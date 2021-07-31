import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Message {
  message: String;
  colorTexte: 'white' | 'orange' | 'red'
}

@Injectable({
  providedIn: 'root'
})
export class MessageStoreService {

  private readonly _messageSource = new BehaviorSubject<Message>({message: 'Bienvenue', colorTexte: 'white'});

  readonly message$ = this._messageSource.asObservable();

  constructor() {
  }

  setMessage(message: Message): void {
    this._messageSource.next(message);
  }
}

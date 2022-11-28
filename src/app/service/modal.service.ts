import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  textElement: string = '';
  constructor() {}

  $popup = new EventEmitter<boolean>();

  showMessage(text: string) {
    this.textElement = text;
    this.$popup.emit(true);
  }
  getText(): string {
    return this.textElement;
  }
}

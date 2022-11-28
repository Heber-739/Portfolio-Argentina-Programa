import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/service/modal.service';
import { EncryptorValidators } from './validators';

@Component({
  selector: 'app-encryptor',
  templateUrl: './encryptor.component.html',
  styleUrls: ['./encryptor.component.css'],
})
export class EncryptorComponent {
  toggle: boolean = true;
  keyControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(4),
    Validators.pattern(/[\d]{4}/),
  ]);
  encryptTextControl = new FormControl('', [
    Validators.required,
    EncryptorValidators.asciiCharRange(),
  ]);
  decriptTextControl = new FormControl('', [Validators.required]);
  textControlTwo = new FormControl('', [Validators.required]);

  constructor(private popup: ModalService) {}
  toggleEncrypt() {
    this.toggle = !this.toggle;
  }

  encrypt(): void {
    let decrypted: string = '';
    let key: string = this.keyControl.value.toString();
    let text: string = this.encryptTextControl.value;
    let flag: number = 174;
    for (let i = 0; i < text.length; i++) {
      let t1: number = 0;
      let t2: number = 0;
      let t3: number = 0;
      const element = text[i].charCodeAt(0);
      if (parseInt(key[0]) % 2 != 0 && element != undefined) {
        if (parseInt(key[0]) === 1) t1 = element * 13;
        else t1 = element * parseInt(key[0]);
        t2 = t1 + parseInt(key[1]);
      } else if (parseInt(key[0]) % 2 == 0 && element != undefined) {
        let paramAdd: number = parseInt(key[0]) + 1;
        t1 = element * paramAdd;
        t2 = t1 + parseInt(key[2]);
      }
      t3 = t2 - parseInt(key[3]);
      if (t3 > 126) {
        let param = 0;
        while (t3 > 126) {
          t3 -= 96;
          param++;
        }
        decrypted += String.fromCodePoint(t3);
        if (param <= 9) {
          decrypted += String.fromCodePoint(flag) + '0' + param.toString();
        } else {
          decrypted += String.fromCodePoint(flag) + param.toString();
        }
        if (flag == 255) flag = 174;
        else flag++;
      } else {
        decrypted += String.fromCodePoint(t3);
      }
    }
    this.textControlTwo.setValue(decrypted);
  }
  decrypt(): void {
    let encripted: string = '';
    let key = this.keyControl.value.toString();
    let text: string = this.decriptTextControl.value;
    let flag: number = 174;
    for (let i = 0; i < text.length; i++) {
      let t1 = 0;
      let t2 = 0;
      let t3 = 0;
      const element = text[i].charCodeAt(0);
      if (
        text[i + 1] &&
        text[i + 1].charCodeAt(0) === flag &&
        element != undefined
      ) {
        let factor1: number = parseInt(text[i + 2] + text[i + 3]);
        if (flag == 255) flag = 174;
        else flag++;
        let factor2: number = factor1 * 96;
        t1 = element + factor2 + parseInt(key[3]);
        i += 3;
      } else if (element != undefined) {
        t1 = element + parseInt(key[3]);
      }

      if (parseInt(key[0]) % 2 != 0) {
        t2 = t1 - parseInt(key[1]);
        if (parseInt(key[0]) === 1) t3 = t2 / 13;
        else t3 = t2 / parseInt(key[0]);
      } else if (parseInt(key[0]) % 2 == 0) {
        let paramAdd: number = parseInt(key[0]) + 1;
        t2 = t1 - parseInt(key[2]);
        t3 = t2 / paramAdd;
      }
      encripted += String.fromCharCode(t3);
    }
    this.textControlTwo.setValue(encripted);
  }
  copy() {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      navigator.clipboard.writeText(this.textControlTwo.value);
      this.popup.showMessage('Codigo copiado');
    } else {
      // text area method
      let textArea = document.createElement('textarea');
      textArea.value = this.textControlTwo.value;
      // make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      // here the magic happens
      try {
        document.execCommand('copy');
        textArea.remove();
        this.popup.showMessage('Codigo copiado');
      } catch (error) {
        this.popup.showMessage(
          'Ocurrió un problema, pruebe copiar manualmente'
        );
        console.log(error);
      }
    }
    this.encryptTextControl.setValue('Hecho');
  }
  moreInfo() {
    this.popup.showMessage(
      'Ingrese un código de 4 números que servirá como llave de encriptado. Luego ingrese el texto a encriptar/desencriptar y obtenga el resultado'
    );
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { Wallet } from '../interface/wallet';

const WALLET = 'wallet';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  $haveBalance = new EventEmitter<boolean>();

  constructor() {}

  checkWallet(): Wallet {
    if (localStorage.getItem(WALLET)) {
      if (
        JSON.parse(localStorage.getItem(WALLET) || '{balance: 0}').balance == 0
      ) {
        this.$haveBalance.next(false);
        return { img: '', name: '', balance: 0 };
      } else {
        this.$haveBalance.next(true);
        return JSON.parse(localStorage.getItem(WALLET)!);
      }
    }
    this.$haveBalance.next(false);
    return { img: '', name: '', balance: 0 };
  }
}

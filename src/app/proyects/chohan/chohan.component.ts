import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Wallet } from '../../interface/wallet';
import { MagicDices } from './dados';

interface Regist {
  bet: number;
  balance: number;
  result: string;
}
@Component({
  selector: 'app-chohan',
  templateUrl: './chohan.component.html',
  styleUrls: ['./chohan.component.css'],
})
export class ChohanComponent implements OnInit, OnDestroy {
  registers: Regist[];
  switchMenssage: string = '';
  name: string = '';
  wallet: Wallet = {
    img: '',
    name: '',
    balance: 0,
  };
  visibility: boolean = true;
  question: boolean = false;
  haveBalance: boolean = true;
  result: number = 0;
  parity: string = '';
  bet: number = 0;
  magicDices: MagicDices = new MagicDices();

  nameInput = new FormControl('', [Validators.required]);
  betInput = new FormControl('', [Validators.required]);

  constructor() {
    this.wallet = JSON.parse(localStorage.getItem('wallet')!);
    this.registers = JSON.parse(localStorage.getItem('chohanBets') || '[]');
  }
  ngOnInit(): void {
    this.betInput.disable();
    this.magicDices = new MagicDices();
  }
  ngOnDestroy(): void {
    localStorage.setItem('chohanBets', JSON.stringify(this.registers));
    localStorage.setItem('wallet', JSON.stringify(this.wallet));
  }

  start() {
    this.name = this.nameInput.value;
    this.visibility = false;
    this.betInput.enable();
    this.switchMenssage = 'bienvenida';
  }
  play(parity: boolean) {
    this.bet = this.betInput.value;
    this.betInput.reset();
    this.betInput.disable();
    const timer = this.magicDices.rollDice();
    setTimeout(() => {
      let newRegist: Regist = {
        bet: this.bet,
        balance: 0,
        result: '',
      };
      let resu = this.magicDices.result_one + this.magicDices.result_two;
      if ((resu % 2 == 0 && parity) || (resu % 2 != 0 && !parity)) {
        this.switchMenssage = 'gano';
        this.wallet.balance += this.bet;
        newRegist.balance = this.wallet.balance;
        newRegist.result = 'gano';
      } else if ((resu % 2 == 0 && !parity) || (resu % 2 != 0 && parity)) {
        this.switchMenssage = 'perdio';
        this.wallet.balance -= this.bet;
        newRegist.balance = this.wallet.balance;
        newRegist.result = 'perdio';
      }
      this.result = resu;
      if (resu % 2 == 0) this.parity = 'par';
      else this.parity = 'impar';

      this.registers.push(newRegist);
      if (this.wallet.balance != 0) {
        this.question = true;
      } else {
        this.continuePlaying(false);
        localStorage.setItem('chohanBets', JSON.stringify(this.registers));
        localStorage.removeItem('wallet');
      }
    }, timer + 200);
  }
  continuePlaying(value: boolean) {
    this.parity = '';
    if (value) this.betInput.enable();
    else {
      this.switchMenssage = 'despedida';
      this.haveBalance = false;
    }
    this.question = false;
  }
}

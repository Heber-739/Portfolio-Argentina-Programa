import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { ModalService } from 'src/app/service/modal.service';
import { Coin } from '../../interface/coin';
import { Wallet } from '../../interface/wallet';

interface SimpleCoin {market_data:{current_price:{usd:number}}}
@Component({
  selector: 'app-crypto-form',
  templateUrl: './crypto-form.component.html',
  styleUrls: ['./crypto-form.component.css'],
})
export class CryptoFormComponent implements OnInit {
  @ViewChild('MinDeposit') minDeposit: ElementRef = {} as ElementRef;
  mySetInterval: ReturnType<typeof setTimeout> = setInterval(() => {}, 0);
  cryptoList: Coin[] = [];
  minNow: number = 0;
  showCryptoList: Coin[] = [];
  alreadyDeposit: boolean = false;
  wallet: Wallet = { img: '', name: '', balance: 0 };
  cryptoSelected: Coin = { id: 0,name: '', current_price: 0, image: '', symbol: '' };
  depositForm = new FormGroup({
    currency: new FormControl('', [Validators.required]),
    money: new FormControl(''),
  });

  constructor(
    private render: Renderer2,
    private localS: LocalStorageService,
    private http: HttpClient,
    private popup: ModalService
  ) {}

  ngOnInit(): void {
    this.localS.$haveBalance.subscribe((res) => (this.alreadyDeposit = res));
    this.wallet = this.localS.checkWallet();
    if (this.localS.$haveBalance) {
      this.getCryptoData();
    }
    this.depositForm.controls['money'].disable();
    this.depositForm
      .get('currency')
      ?.valueChanges.subscribe({
        next:(e) => {
          this.cryptoSelect(e)
          console.log(e)
        }
      });
  }

  getCryptoData() {
    try {
      this.mySetInterval = setInterval(() => {
        this.http
          .get<Coin[]>(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
          )
          .subscribe({
            next:(response)=>{
              this.cryptoList = [];
              response.forEach((e) => {
                let item: Coin = {
                  id: e.id,
                  name: e.name,
                  current_price: e.current_price,
                  image: e.image,
                  symbol: e.symbol.toUpperCase(),
                };
                this.cryptoList.push(item);
              });
              console.log(response)
            }
          });
      }, 20000);
    } catch (error) {
      console.log(error);
    }
  }
  select(item: Coin) {
    clearInterval(this.mySetInterval);
    this.minNow = (1000/item.current_price);
    this.render.setProperty(this.minDeposit.nativeElement,'innerHTML',`Deposite un mínimo de ${this.minNow.toFixed(8)}`)
    this.mySetInterval = setInterval(() => {
        this.http
        .get<SimpleCoin>(
          `https://api.coingecko.com/api/v3/coins/${item.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        )
        .subscribe({
          next:(response)=>{
             this.minNow = 1000/response.market_data.current_price.usd
          this.depositForm.controls['money'].setValidators([
            Validators.min(this.minNow),Validators.required          ]);
          this.render.setProperty(this.minDeposit.nativeElement,'innerHTML',`Deposite un mínimo de ${this.minNow.toFixed(8)}`)
          },
          complete: ()=>{

          }
        });
      }, 20000);
    this.cryptoSelected = item;
    this.depositForm.setValue({
      currency: item.name,
      money: null,
    });
    this.depositForm.controls['currency'].disable();
    this.showCryptoList = [];
    this.depositForm.controls['money'].enable();
    
    this.mySetInterval = setInterval(() => {
      
    }, 15000);
  }

  deposit() {
    if(this.depositForm.get('money')?.value >= this.minNow){
      clearInterval(this.mySetInterval);
    this.wallet = {
      img: this.cryptoSelected.image,
      name: this.cryptoSelected.symbol,
      balance: this.depositForm.get('money')?.value,
    };
    localStorage.setItem('wallet', JSON.stringify(this.wallet));
    this.localS.$haveBalance.next(true);
    this.popup.showMessage('Depósito realizado');
    }else{
      this.popup.showMessage('Depósito insuficiente, ingrese una suma mayor.');
    }
    
  }
  cryptoSelect(ev: string) {
    let newArratCrypto = this.cryptoList.filter((el) => (el.name.toUpperCase().includes(ev.toUpperCase()) && ev != '') );
    this.showCryptoList = newArratCrypto;
    console.log(newArratCrypto)
  }
  resetForm() {
    clearInterval(this.mySetInterval);
    this.getCryptoData()
    this.depositForm.controls['money'].disable();
    this.depositForm.controls['currency'].enable();
    this.showCryptoList = [];
    this.cryptoSelected = {id:0, name: '', current_price: 0, image: '', symbol: '' };
  }
}

export class MagicDices {
  public diceOne: HTMLElement[];
  public diceTwo: HTMLElement[];
  public result_one: number = 0;
  public result_two: number = 0;
  constructor() {
    this.diceOne = [
      document.getElementById('value1_1')!,
      document.getElementById('value2_1')!,
      document.getElementById('value3_1')!,
      document.getElementById('value4_1')!,
      document.getElementById('value5_1')!,
      document.getElementById('value6_1')!,
      document.getElementById('value7_1')!,
    ];
    this.diceTwo = [
      document.getElementById('value1_2')!,
      document.getElementById('value2_2')!,
      document.getElementById('value3_2')!,
      document.getElementById('value4_2')!,
      document.getElementById('value5_2')!,
      document.getElementById('value6_2')!,
      document.getElementById('value7_2')!,
    ];
  }

  limpiarDado1(): void {
    for (var i = 0; i < this.diceOne.length; i++) {
      this.diceOne[i].style.display = 'none';
    }
  }
  limpiarDado2(): void {
    for (var i = 0; i < this.diceTwo.length; i++) {
      this.diceTwo[i].style.display = 'none';
    }
  }

  rollDice(): number {
    let numeroDeGiros: number = Math.round(Math.random() * 15 + 7);
    let seg: number = 200;
    for (let i = 0; i <= numeroDeGiros; i++) {
      setTimeout(() => {
        this.result_one = this.rollDice_one();
      }, seg);
      setTimeout(() => {
        this.result_two = this.rollDice_two();
      }, seg);
      seg += 200;
    }
    return seg;
  }
  rollDice_one(): number {
    const giro1: number = Math.round(Math.random() * 5 + 1);
    switch (giro1) {
      case 1:
        this.limpiarDado1();
        this.diceOne[3].style.display = 'block';
        break;
      case 2:
        this.limpiarDado1();
        this.diceOne[2].style.display = 'block';
        this.diceOne[4].style.display = 'block';
        break;
      case 3:
        this.limpiarDado1();
        this.diceOne[2].style.display = 'block';
        this.diceOne[3].style.display = 'block';
        this.diceOne[4].style.display = 'block';
        break;
      case 4:
        this.limpiarDado1();
        this.diceOne[0].style.display = 'block';
        this.diceOne[2].style.display = 'block';
        this.diceOne[4].style.display = 'block';
        this.diceOne[5].style.display = 'block';
        break;
      case 5:
        this.limpiarDado1();
        this.diceOne[0].style.display = 'block';
        this.diceOne[2].style.display = 'block';
        this.diceOne[3].style.display = 'block';
        this.diceOne[4].style.display = 'block';
        this.diceOne[5].style.display = 'block';
        break;
      case 6:
        this.limpiarDado1();
        this.diceOne[0].style.display = 'block';
        this.diceOne[1].style.display = 'block';
        this.diceOne[2].style.display = 'block';
        this.diceOne[4].style.display = 'block';
        this.diceOne[5].style.display = 'block';
        this.diceOne[6].style.display = 'block';
        break;
    }
    return giro1;
  }

  rollDice_two(): number {
    const giro2: number = Math.round(Math.random() * 5 + 1);
    switch (giro2) {
      case 1:
        this.limpiarDado2();
        this.diceTwo[3].style.display = 'block';
        break;
      case 2:
        this.limpiarDado2();
        this.diceTwo[2].style.display = 'block';
        this.diceTwo[4].style.display = 'block';
        break;
      case 3:
        this.limpiarDado2();
        this.diceTwo[2].style.display = 'block';
        this.diceTwo[3].style.display = 'block';
        this.diceTwo[4].style.display = 'block';
        break;
      case 4:
        this.limpiarDado2();
        this.diceTwo[0].style.display = 'block';
        this.diceTwo[2].style.display = 'block';
        this.diceTwo[4].style.display = 'block';
        this.diceTwo[5].style.display = 'block';
        break;
      case 5:
        this.limpiarDado2();
        this.diceTwo[0].style.display = 'block';
        this.diceTwo[2].style.display = 'block';
        this.diceTwo[3].style.display = 'block';
        this.diceTwo[4].style.display = 'block';
        this.diceTwo[5].style.display = 'block';
        break;
      case 6:
        this.limpiarDado2();
        this.diceTwo[0].style.display = 'block';
        this.diceTwo[1].style.display = 'block';
        this.diceTwo[2].style.display = 'block';
        this.diceTwo[4].style.display = 'block';
        this.diceTwo[5].style.display = 'block';
        this.diceTwo[6].style.display = 'block';
        break;
    }
    return giro2;
  }
}

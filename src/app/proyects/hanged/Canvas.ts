export class Canvas {
  static ctx: CanvasRenderingContext2D;
  constructor(context: CanvasRenderingContext2D) {
    Canvas.ctx = context;
  }
  static render() {
    Canvas.ctx.lineWidth = 3;
    Canvas.ctx.lineCap = 'round';
    Canvas.ctx.lineJoin = 'round';
    Canvas.ctx.strokeStyle = '#000';
    Canvas.ctx.beginPath();
    Canvas.ctx.fillStyle = 'black';
    Canvas.ctx.moveTo(30, 180);
    Canvas.ctx.lineTo(60, 150);
    Canvas.ctx.lineTo(90, 180);
    Canvas.ctx.lineTo(30, 180);
    Canvas.ctx.fill();
  }

  static words: string[] = [
    'usted',
    'chico',
    'muchachos',
    'gusto',
    'anoche',
    'quedarse',
    'nervioso',
    'sentado',
    'primo',
    'evidencia',
    'vivero',
    'andando',
    'mentiroso',
    'conciencia',
    'posibilidades',
    'contado',
    'armario',
    'rastro',
    'casco',
    'consecuencias',
    'buscado',
    'torneo',
  ];
  static word: string = '';
  static hits: number = 0;
  static errors: number = 0;
  static inputLetters: string[] = [];
  static hitsLetters: string[] = [];
  static wrongLetters: string[] = [];
  static end: boolean = true;

  static getWord(): void {
    let index: number = Math.floor(Math.random() * Canvas.words.length);
    let chosenWord = Canvas.words[index].toUpperCase();
    Canvas.letterSpace(chosenWord);
    Canvas.word = chosenWord;
  }
  static addPalabra(palabra: string): void {
    Canvas.words.push(palabra);
  }
  static wordRegister() {
    let space: number = 80;
    Canvas.ctx.beginPath();
    Canvas.ctx.textAlign = 'left';
    Canvas.ctx.fillStyle = 'green';
    Canvas.ctx.font = '16px montserrat';
    Canvas.ctx.fillText('Aciertos:', 5, 240);
    Canvas.hitsLetters.forEach((e) => {
      Canvas.ctx.fillText(e, space, 240);
      space = space + 20;
    });
    space = 80;
    Canvas.ctx.fillStyle = 'red';
    Canvas.ctx.fillText('Errores: ', 5, 270);
    Canvas.wrongLetters.forEach((e) => {
      Canvas.ctx.fillText(e, space, 270);
      space = space + 20;
    });
    Canvas.ctx.closePath();
  }
  static letterSpace(wrd: string) {
    let start = 10;
    let space = 40 / wrd.length;
    let spacing = (280 - wrd.length * space) / wrd.length;
    for (let i = 0; i < wrd.length; i++) {
      Canvas.ctx.beginPath();
      Canvas.ctx.moveTo(start, 380);
      Canvas.ctx.lineTo(start + spacing, 380);
      Canvas.ctx.stroke();
      Canvas.ctx.closePath();
      start += spacing + space;
    }
  }

  static evaluateLetter(letter: string) {
    if (Canvas.end) {
      Canvas.ctx.clearRect(0, 182, 320, 100);

      if (!Canvas.inputLetters.includes(letter)) {
        Canvas.inputLetters.push(letter);
        if (Canvas.word.includes(letter)) {
          Canvas.hitsLetters.push(letter);
          let start = 10;
          let space = 40 / Canvas.word.length;
          Canvas.ctx.textAlign = 'center';
          let spacing = (280 - Canvas.word.length * space) / Canvas.word.length;
          for (var i = 0; i < Canvas.word.length; i++) {
            if (letter == Canvas.word[i]) {
              Canvas.ctx.beginPath();
              Canvas.ctx.fillStyle = 'black';
              Canvas.ctx.font = `bold ${6 * space}px montserrat`;
              Canvas.ctx.fillText(letter, start + spacing / 2, 377);
              Canvas.ctx.closePath();
              Canvas.hits++;
              if (Canvas.hits == Canvas.word.length) {
                Canvas.endGame('gano');
              }
            }
            start += spacing + space;
          }
        } else {
          Canvas.wrongLetters.push(letter);
          Canvas.drawError();
        }
      } else {
        Canvas.repeatedLetter();
      }
    }
    Canvas.wordRegister();
  }

  static repeatedLetter() {
    Canvas.ctx.beginPath();
    Canvas.ctx.font = `bold 20px montserrat`;
    Canvas.ctx.fillStyle = 'red';
    Canvas.ctx.textAlign = 'left';
    Canvas.ctx.fillText('La letra ya fue ingresada', 15, 210);
    Canvas.ctx.closePath();
  }
  static drawError() {
    Canvas.errors++;
    Canvas.ctx.beginPath();
    switch (Canvas.errors) {
      case 1:
        Canvas.ctx.moveTo(60, 150); //palo1
        Canvas.ctx.lineTo(60, 10);
        break;
      case 2:
        Canvas.ctx.moveTo(60, 10); //palo2
        Canvas.ctx.lineTo(180, 10);
        break;
      case 3:
        Canvas.ctx.moveTo(180, 10); //palo3
        Canvas.ctx.lineTo(180, 25);
        break;
      case 4:
        Canvas.ctx.moveTo(180, 10); //cabeza
        Canvas.ctx.arc(180, 40, 15, 300, 2 * 3.14, true);
        break;
      case 5:
        Canvas.ctx.moveTo(180, 55); //cuerpo
        Canvas.ctx.lineTo(180, 120);
        break;
      case 6:
        Canvas.ctx.moveTo(180, 120); //pierna1
        Canvas.ctx.lineTo(155, 160);
        break;
      case 7:
        Canvas.ctx.moveTo(180, 120); //pierna2
        Canvas.ctx.lineTo(205, 160);
        break;
      case 8:
        Canvas.ctx.moveTo(180, 70); //brazo1
        Canvas.ctx.lineTo(210, 100);
        break;
      case 9:
        Canvas.ctx.moveTo(180, 70); //brazo2
        Canvas.ctx.lineTo(150, 100);
        Canvas.endGame('perdio');
        break;
    }
    Canvas.ctx.stroke();
    Canvas.ctx.closePath();
  }
  static endGame(result: string) {
    Canvas.ctx.beginPath();
    Canvas.ctx.textAlign = 'center';
    Canvas.ctx.font = `bold 23px montserrat`;
    if (result == 'gano') {
      Canvas.ctx.fillStyle = 'green';
      Canvas.ctx.fillText('Felicidades por Ganar!', 150, 310);
    } else {
      Canvas.ctx.fillStyle = 'red';
      Canvas.ctx.fillText('Usted Perdió', 160, 320);
      Canvas.ctx.clearRect(0, 320, 320, 400);
      Canvas.ctx.fillText('La Palabra era:', 160, 350);
      Canvas.ctx.font = `bold 30px montserrat`;
      Canvas.ctx.fillText(Canvas.word, 160, 395);
    }
    Canvas.ctx.closePath();
    Canvas.end = false;
  }
  static reset() {
    Canvas.hits = 0;
    Canvas.errors = 0;
    Canvas.inputLetters = [];
    Canvas.hitsLetters = [];
    Canvas.wrongLetters = [];
    Canvas.word = '';
    Canvas.end = true;
  }
}

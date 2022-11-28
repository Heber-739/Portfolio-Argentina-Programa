import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { AfterViewInit, ViewChild, Component, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/service/modal.service';
import { Canvas } from './Canvas';

@Component({
  selector: 'app-hanged',
  templateUrl: './hanged.component.html',
  styleUrls: ['./hanged.component.css'],
})
export class HangedComponent implements AfterViewInit {
  constructor(private popup: ModalService) {}
  @ViewChild('canvasRef', { static: false }) canvasRef: ElementRef =
    {} as ElementRef;

  inputControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);
  inputTwoControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/[A-Za-z]/),
    Validators.maxLength(1),
  ]);
  visibility: boolean = true;

  ngAfterViewInit(): void {
    if (this.canvasRef.nativeElement.getContext('2d') != null) {
      new Canvas(this.canvasRef.nativeElement.getContext('2d'));
    }
    Canvas.render();
  }
  addWord() {
    this.popup.showMessage('Palabra agregada');
    Canvas.addPalabra(this.inputControl.value);
  }
  start() {
    this.visibility = false;
    Canvas.getWord();
    this.inputControl.setValue('');
  }
  try() {
    const letter: string = this.inputTwoControl.value;
    Canvas.evaluateLetter(letter.toUpperCase());
    this.inputTwoControl.reset();
  }
  reload() {
    this.canvasRef.nativeElement.clearRect(0, 0, 320, 400);
    Canvas.render();
    this.visibility = true;
    this.inputControl.setValue('');
    Canvas.reset();
  }
  moreInfo() {
    this.popup.showMessage(
      `Opcionalmente puede agregar una nueva palabra al juego, evite los numeros o caracteres especiales.`
    );
  }
}

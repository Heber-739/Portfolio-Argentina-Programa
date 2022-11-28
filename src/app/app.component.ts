import { Component } from '@angular/core';
import { ModalService } from './service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portafolio';
  haveMessage = false;
  content: string = '';
  constructor(private popupService: ModalService) {
    this.popupService.$popup.subscribe((res) => {
      if (res) {
        this.haveMessage = res;
        this.content = this.popupService.getText();
      }
    });
  }
  closePopup() {
    this.popupService.$popup.emit(false);
    this.haveMessage = false;
  }
  onActivate() {
    window.scroll(0, 0);
  }
}

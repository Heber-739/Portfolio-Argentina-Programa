import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../backend/service/token.service';
import { UserService } from '../backend/service/user.service';
import { ModalService } from '../service/modal.service';
import { ChangeTheme } from './ChangeTheme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements AfterViewInit {
  selColor: boolean = false;
  menuActive: boolean = false;
  isLogged: boolean = false;
  constructor(
    private router: Router,
    private popup: ModalService,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.tokenService
      .loggedObservable()
      .subscribe({ next: (res) => (this.isLogged = res) });
    if (localStorage.getItem('theme')) {
      ChangeTheme.sendColors(JSON.parse(localStorage.getItem('theme')!));
    }
  }

  ngAfterViewInit(): void {
    if (this.tokenService.getToken()) {
      if (this.tokenService.isExistInDatabase()) {
        this.userService.getUser();
      } else {
        this.popup.showMessage(
          'Ya se encuentra logueado en la página, ahora puede ingresar sus datos.'
        );
        this.router.navigate(['newUser']);
      }
    }
    if (this.tokenService.isAdmin()) {
      this.popup.showMessage(
        `Bienvenido administrador! Puede ver información privilegiada con el boton al final de esta página.`
      );
      localStorage.removeItem('isAdmin');
    }
  }

  changeTheme(valor: string) {
    if (valor == 'open') {
      this.selColor = !this.selColor;
    } else {
      this.touch();
      ChangeTheme.sendColors(valor);
    }
  }
  logout(): void {
    this.tokenService.logOut();
    this.tokenService.changeObservable(false);
    window.location.reload();
    this.touch();
  }
  menu(timer: number) {
    setTimeout(() => {
      this.menuActive = !this.menuActive;
    }, timer);
  }
  touch() {
    this.menuActive = false;
    this.selColor = false;
  }
}

import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../backend/service/token.service';
import { UserService } from '../backend/service/user.service';
import { ModalService } from '../service/modal.service';

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
    this.ChangeTheme(JSON.parse(localStorage.getItem('theme')!));
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

  changeTheme(v: string) {
    if (v == 'open') {
      this.selColor = !this.selColor;
    } else {
      this.touch();
      let c: string[] = this.ChangeTheme(v);
      for (let i = 0; i < 5; i++) {
        document.documentElement.style.setProperty(
          `--color${i + 1}`,
          `${c[i]}`
        );
      }
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
  ChangeTheme(v?: string): string[] {
    if (v == 'red') {
      return ['#a30a29', '#e21d38', '#fc5555', '#761622', '#db4900'];
    } else if (v == 'green') {
      return ['#40A33C', '#b38f00', '#6bb300', '#356600', '#7d6400'];
    } else if (v == 'dark') {
      return ['#4d4d4d', '#778899', '#595959', '#1a1a1a', '#0e0e0e'];
    }
    return ['#3c40a4', '#4d68f0', '#8697fe', '#003567', '#119e99'];
  }
}

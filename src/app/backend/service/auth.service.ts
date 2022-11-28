import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../interface/jwt-dto';
import { LoginUser } from '../interface/loginUser';
import { NewUser } from '../interface/newUser';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL: string = `${environment.URL}/auth`

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService,
    private router: Router,
    private userS: UserService
  ) {}

  public newUser(dataUser: NewUser) {
    this.http.post<any>(this.authURL + '/generated', dataUser).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
      },
      error: (err) => {
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        );
      },
      complete: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  public loginUser(loginUser: LoginUser): void {
    this.http.post<JwtDto>(this.authURL + '/login', loginUser).subscribe({
      next: (data) => {
        this.token.setUsername(data.username);
        this.token.setAuthorities(data.authorities);
        this.token.setToken(data.token);
        this.token.setExistUser(data.exist);
        this.token.changeObservable(true);
      },
      error: (err) => {
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        );
      },
      complete: () => {
        if (this.token.isExistInDatabase()) {
          this.userS.getUser();
        } else {
          this.router.navigate(['newUser']);
        }
      },
    });
  }
}

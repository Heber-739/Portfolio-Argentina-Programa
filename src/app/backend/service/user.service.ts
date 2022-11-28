import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DataUser } from 'src/app/interface/dataUser';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Subject<DataUser> = new Subject();

  URL: string = `${environment.URL}/users`;

  constructor(
    private router: Router,
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeUser() {
    return this.user$.asObservable();
  }
  public changeObservable(user: DataUser) {
    this.token.setUser(user);
    this.user$.next(user);
  }

  public getDefault(): Observable<DataUser> {
    return this.http.get<DataUser>(this.URL + `/get`);
  }
  public getUser() {
    let userId = this.token.getUsername();
    this.http.get<DataUser>(this.URL + `/get/${userId}`).subscribe({
      next: (res) => this.changeObservable(res),
      error: (err) =>
        this.popup.showMessage(
          this.token.errorsMessage(err.error)
        ),
      complete: () => this.router.navigate(['']),
    });
  }

  public sendUser(user: DataUser) {
    this.http.post<Message>(this.URL + `/create`, user).subscribe({
      next: (res) => {
        this.popup.showMessage(
          `${res.message}! Ahora puede completar otros datos como educación y skills más abajo.`
        );
      },
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => {
        this.getUser();
        this.router.navigate(['']);
        this.token.setExistUser(true);
        window.location.reload();
      },
    });
  }
  public updateUser(user: DataUser) {
    this.http
      .put<Message>(this.URL + `/edith/${user.username}`, user)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\n${this.token.errorsMessage(err.error)}`
          ),
        complete: () => {
          this.getUser();
          this.router.navigate(['']);
          this.token.setExistUser(true);
        },
      });
  }
  public deleteUser(id: string) {
    this.http.delete<Message>(this.URL + `/delete/${id}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
    });
  }
}

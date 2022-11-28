import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { WorkExp } from 'src/app/interface/workExp';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const ALL_DB_WORKS = 'AllWorksExpDB';
const LOCAL_WORKS = 'userWorkExp';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  URL: string = `${environment.URL}/workExperience`;
  private WeXP$: Subject<WorkExp[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeWExp() {
    return this.WeXP$.asObservable();
  }
  public changeObservable(wExp: WorkExp[]) {
    this.WeXP$.next(wExp);
  }

  /* -------------LocalStorage´s Methods------------- */
  public getAllDBWorkExp(): WorkExp[] {
    return JSON.parse(window.sessionStorage.getItem(ALL_DB_WORKS) || '[]');
  }
  public setAllDBWorkExp(wExp: WorkExp[]) {
    window.sessionStorage.setItem(ALL_DB_WORKS, JSON.stringify(wExp));
  }
  public getLocalWorkExp(): WorkExp[] {
    return JSON.parse(window.sessionStorage.getItem(LOCAL_WORKS) || '[]');
  }

  public setLocalWorkExp(wExp: WorkExp[]) {
    window.sessionStorage.setItem(LOCAL_WORKS, JSON.stringify(wExp));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllWorkExp() {
    this.http.get<WorkExp[]>(this.URL + '/listAll').subscribe({
      next: (res) => this.setAllDBWorkExp(res),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () =>
        this.popup.showMessage(
          'Ya puede ver la lista completa de Skills existentes en la Base de Datos.'
        ),
    });
  }

  public getWorkExp() {
    let username = this.token.getUsername();
    this.http.get<WorkExp[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.setLocalWorkExp(res);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
    });
  }
  public createWorkExp(wExp: WorkExp) {
    let username = this.token.getUsername();
    this.http.post<Message>(this.URL + `/create/${username}`, wExp).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getWorkExp(),
    });
  }
  public deleteWorkExp(id: number) {
    let username = this.token.getUsername();
    this.http
      .delete<Message>(this.URL + `/delete/${id}/${username}`)
      .subscribe({
        next: (res) => this.popup.showMessage(res.message),
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\n${this.token.errorsMessage(err.error)}`
          ),
        complete: () => {
          if (this.getLocalWorkExp().length === 1) {
            this.changeObservable([]);
            window.sessionStorage.removeItem(LOCAL_WORKS);
          }

          this.getWorkExp();
        },
      });
  }
  public updateWorkExp(wExp: WorkExp) {
    let username = this.token.getUsername();
    this.http
      .put<Message>(this.URL + `/update/${wExp.id}/${username}`, wExp)
      .subscribe({
        next: (res) => this.popup.showMessage(res.message),
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\n${this.token.errorsMessage(err.error)}`
          ),
        complete: () => this.getWorkExp(),
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HardSkill } from 'src/app/interface/hardSkill';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const ALL_DB_HS = 'AllHardSkillDB';
const LOCAL_HS = 'userHardSkill';

@Injectable({
  providedIn: 'root',
})
export class HardSkillService {
  URL: string = `${environment.URL}/hardSkill`;
  private hSkills$: Subject<HardSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeHSs() {
    return this.hSkills$.asObservable();
  }
  public changeObservable(hSs: HardSkill[]) {
    this.hSkills$.next(hSs);
  }

  /* -------------LocalStorage´s Methods------------- */
  public getAllDBHardSkill(): HardSkill[] {
    return JSON.parse(window.sessionStorage.getItem(ALL_DB_HS) || '[]');
  }
  public setAllDBHardSkill(hSs: HardSkill[]) {
    window.sessionStorage.setItem(ALL_DB_HS, JSON.stringify(hSs));
  }
  public getLocalHardSkill(): HardSkill[] {
    return JSON.parse(window.sessionStorage.getItem(LOCAL_HS) || '[]');
  }

  public setLocalHardSkill(hSs: HardSkill[]) {
    window.sessionStorage.setItem(LOCAL_HS, JSON.stringify(hSs));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllHardSkill() {
    this.http.get<HardSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => this.setAllDBHardSkill(res),
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

  public getHardSkill() {
    let username = this.token.getUsername();
    this.http.get<HardSkill[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.setLocalHardSkill(res);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
    });
  }
  public addHSToUser(hsId: number, userId: string) {
    this.http.get<Message>(this.URL + `/add/${hsId}/${userId}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getHardSkill(),
    });
  }
  public removeHSToUser(hsId: number, userId: string) {
    this.http.get<Message>(this.URL + `/remove/${hsId}/${userId}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) => console.log(err),

      complete: () => this.getHardSkill(),
    });
  }
  public createHardSkill(hs: HardSkill) {
    let username = this.token.getUsername();
    this.http.post<Message>(this.URL + `/create/${username}`, hs).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getHardSkill(),
    });
  }
  public deleteHardSkill(id: number) {
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
          this.getHardSkill();
          if (this.getLocalHardSkill().length === 1) {
            window.sessionStorage.removeItem(LOCAL_HS);
            this.changeObservable([]);
          }
        },
      });
  }
  public updateHardSkill(id: number, hs: HardSkill) {
    this.http.put<Message>(this.URL + `/update/${id}`, hs).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getHardSkill(),
    });
  }
}

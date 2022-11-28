import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { SoftSkill } from 'src/app/interface/softSkill';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const ALL_DB_SS = 'AllSoftSkillDB';
const LOCAL_SS = 'userSoftSkill';

@Injectable({
  providedIn: 'root',
})
export class SoftSkillService {
  URL: string = `${environment.URL}/softSkill`;
  private sSkills$: Subject<SoftSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeSs() {
    return this.sSkills$.asObservable();
  }
  public changeObservableSs(sSs: SoftSkill[]) {
    this.sSkills$.next(sSs);
  }

  /* -------------LocalStorage´s Methods------------- */
  public getAllDBSoftSkill(): SoftSkill[] {
    return JSON.parse(window.sessionStorage.getItem(ALL_DB_SS) || '[]');
  }
  public setAllDBSoftSkill(sSs: SoftSkill[]) {
    window.sessionStorage.setItem(ALL_DB_SS, JSON.stringify(sSs));
  }
  public getLocalSoftSkill(): SoftSkill[] {
    return JSON.parse(window.sessionStorage.getItem(LOCAL_SS) || '[]');
  }

  public setLocalSoftSkill(sSs: SoftSkill[]) {
    window.sessionStorage.setItem(LOCAL_SS, JSON.stringify(sSs));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllSoftSkill() {
    this.http.get<SoftSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => this.setAllDBSoftSkill(res),
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

  public getSoftSkill() {
    let username = this.token.getUsername();
    this.http.get<SoftSkill[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.setLocalSoftSkill(res);
        this.changeObservableSs(res);
        console.log(res)
      },
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
    });
  }
  public addSSToUser(ssId: number, userId: string) {
    this.http.get<Message>(this.URL + `/add/${ssId}/${userId}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getSoftSkill(),
    });
  }
  public removeSSToUser(ssId: number, userId: string) {
    this.http.get<Message>(this.URL + `/remove/${ssId}/${userId}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getSoftSkill(),
    });
  }
  public createSoftSkill(ss: SoftSkill) {
    let username = this.token.getUsername();
    this.http.post<Message>(this.URL + `/create/${username}`, ss).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getSoftSkill(),
    });
  }
  public deleteSoftSkill(id: number) {
    let username = this.token.getUsername();
    this.http.get<Message>(this.URL + `/remove/${id}/${username}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => {
        this.getSoftSkill();
        if (this.getLocalSoftSkill().length === 1) {
          window.sessionStorage.removeItem(LOCAL_SS);
          this.changeObservableSs([]);
        }
      },
    });
  }
  public updateSoftSkill(ss: SoftSkill) {
    this.http.put<Message>(this.URL + `/update/${ss.id}`, ss).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(
          `${err.error.message}\n${this.token.errorsMessage(err.error)}`
        ),
      complete: () => this.getSoftSkill(),
    });
  }
}

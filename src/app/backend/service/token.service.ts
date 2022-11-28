import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataUser } from 'src/app/interface/dataUser';

const tokenKey = 'authToken';
const usernameKey = 'authUsername';
const authoritiesKey = 'authAuthorities';
const user = 'userFromDataBase';
const isExist = 'existUserInDatabase';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  rols: string[] = [];
  private isLogged$: Subject<boolean> = new Subject();
  private edithMode$: Subject<boolean> = new Subject();

  constructor() {}
  public loggedObservable(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }
  public changeObservable(status: boolean): void {
    this.isLogged$.next(status);
  }
  public edithObservable(): Observable<boolean> {
    return this.edithMode$.asObservable();
  }
  public changeEdithObservable(status: boolean): void {
    this.edithMode$.next(status);
  }

  public isExistInDatabase(): boolean {
    return JSON.parse(window.sessionStorage.getItem(isExist)!);
  }
  public setExistUser(data: boolean): void {
    window.sessionStorage.setItem(isExist, JSON.stringify(data));
  }

  public getUser(): DataUser {
    return JSON.parse(sessionStorage.getItem(user) || 'false');
  }
  public setUser(userDB: DataUser): void {
    window.sessionStorage.removeItem(user);
    window.sessionStorage.setItem(user, JSON.stringify(userDB));
  }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.setItem(tokenKey, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(tokenKey)!;
  }
  public setUsername(username: string): void {
    window.sessionStorage.removeItem(usernameKey);
    window.sessionStorage.setItem(usernameKey, username);
  }
  public getUsername(): string {
    return sessionStorage.getItem(usernameKey) || 'Heber739';
  }
  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(authoritiesKey);
    window.sessionStorage.setItem(authoritiesKey, JSON.stringify(authorities));
  }
  public getAuthorities(): string[] {
    this.rols = [];
    if (sessionStorage.getItem(authoritiesKey)) {
      JSON.parse(sessionStorage.getItem(authoritiesKey)!).forEach(
        (authority: any) => {
          if (authority.authority == 'ROLE_ADMIN') {
            localStorage.setItem('isAdmin', '1');
          }
          this.rols.push(authority.authority);
        }
      );
    }
    return this.rols;
  }
  public errorsMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Hubo un error en la solicitud. Revise la información y pruebe nuevamente.';
      case 401:
        return 'Error de autenticación. Pruebe salir e iniciar sesión nuevamente.';
      case 403:
        return 'No posee la autorización para esta operación.Pruebe salir e iniciar sesión nuevamente.';
      case 404:
        return 'Existe información que no se encuentra en la base de datos.';
      case 500 - 599:
        return 'Error de la pagina web, estamos intentando solucionar el error. Puede probar con otras operaciones o contenido similar.';
      default:
        return `Codigo de error: ${error.status}`;
    }
  }
  public isAdmin(): string {
    return window.sessionStorage.getItem('isAdmin')!;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}

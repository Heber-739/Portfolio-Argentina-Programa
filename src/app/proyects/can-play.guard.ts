import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanPlayGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate():
    | boolean
    | UrlTree {
    if (localStorage.getItem('wallet')) return true;
    else return this.router.parseUrl('/proyectos');
  }
}

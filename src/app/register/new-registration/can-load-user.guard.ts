import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from 'src/app/backend/service/token.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoadUserGuard implements CanActivate {
  constructor(private router: Router, private token: TokenService) {}

  canActivate(): UrlTree | boolean {
    if (!this.token.getToken()) {
      return this.router.parseUrl('login');
    } else {
      return true;
    }
  }
}

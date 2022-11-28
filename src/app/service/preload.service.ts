import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PreloadService implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (!route?.data?.['preload']) {
      return of(false);
    }

    return of(true).pipe(
      delay(10000),
      switchMap(() => load())
    );
  }
}

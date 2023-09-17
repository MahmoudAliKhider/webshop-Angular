import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
import { User } from '../modules/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AuthUserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser!: User;

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: any) => (currentUser = user));

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}

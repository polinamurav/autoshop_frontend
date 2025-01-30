import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokens = this.authService.getToken();

    if (tokens && tokens.accessToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

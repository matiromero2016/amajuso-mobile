import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { catchError, map, switchMap, filter, take } from 'rxjs/operators';
import { IAuthResponse } from '../interfaces/auth-response.interface';

@Injectable()
export class Interceptor implements HttpInterceptor {
    refreshTokenInProgress = false;
    refreshTokenSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService, 
        private router : Router, 
        private loadingCtrl : LoadingController,
        private alertCtrl: AlertController) {

        }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if (req.url.startsWith(environment['API_URL'] + '/api')) {
           return next.handle(this.addAuthToken(req)).pipe(
            map((event: HttpEvent<any>) => {
                return event
            }),
            catchError((error: HttpErrorResponse)=> {
                if (req.url.includes('Accounts')) 
                    return throwError(error);
                if (error.status !== 401) {
                    return throwError(error);
                }
                if(this.refreshTokenInProgress) {
                    console.error('refresh token in progress:', error);
                    return this.refreshTokenSubject.pipe(
                        filter((result: any) => result != null),
                        take(1),
                        switchMap(()=> next.handle(this.addAuthToken(req)))
                    )
                }
                else {
                    this.refreshTokenInProgress = true;
                    this.refreshTokenSubject.next(null);
                    this.authService.loginWithRefreshToken().then((res: IAuthResponse)=> {
                        this.refreshTokenInProgress = false;
                        this.refreshTokenSubject.next(res.accessToken);
                        return next.handle(this.addAuthToken(req));
                    }).catch(error=> {
                        console.log('refresh token error:', error);
                        this.loadingCtrl.getTop().then(v=> v ? this.loadingCtrl.dismiss() : null);
                        this.authService.logout();
                        this.router.navigateByUrl('/login');
                    });
                }}))}
       else {
        return next.handle(req);
       }
    }

    addAuthToken(request) {
        const accessToken = this.authService.getToken();

        if (!accessToken) {
            return request;
        }

        return request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

}
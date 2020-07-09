import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/user.interface';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
	readonly accessToken = "accessToken";
	readonly refreshToken = "refreshToken";
	readonly expiresIn = "expiresIn";
  private loginData: {
		accessToken: string,
		refreshToken: string,
		expiresIn: number
  };
  constructor(private http : HttpClient) {
	super();
    this.loginData = {
			accessToken: '',
			refreshToken: '',
			expiresIn: null
		};
	this.getInitialTokenCredentials();
   }

   login (email, password) : Observable<any>{
    this.loginData.accessToken = null;
    localStorage.clear();

    const loginData = {
			userID: email,
			accessKey: password,
			grantType: 'password'
		}

    let request = this.http.post(environment['API_URL'] + '/api/Login', loginData);
    return request;
   }

   afterLogin(accessToken: string, refreshToken: string, expiresIn: number ) {
		this.setToken(accessToken);
		this.setRefreshToken(refreshToken);
		this.setExpiresIn(expiresIn);
	}

	signUp(usuario : IUser) : Observable<IUser> {
		usuario.role = "Administrator";
		usuario.terms = 1;
		let response =this.http.post(environment.API_URL + '/api/users', usuario)
			.pipe(
				map(this.extractData),
				catchError(this.serviceError)
				);
				return response;
	}

  getInitialTokenCredentials() : boolean {
	  this.loginData = {
		  accessToken: localStorage.getItem(this.accessToken),
		  refreshToken: localStorage.getItem(this.refreshToken),
		  expiresIn: Number(localStorage.getItem(this.expiresIn)),
	  }
	  console.log('dataLogin', this.loginData );
	  return this.loginData.accessToken ? true : false;
  }

  getToken() {
	  console.log('dataLogin.AccessToken', this.loginData.accessToken);
	  return this.loginData.accessToken;
  }

  getRefreshToken() {
	  return this.loginData.refreshToken;
  }
  getExpiresIn() {
	  return this.loginData.expiresIn;
  }

  setToken(token: string): void {
		this.loginData.accessToken = token;
		localStorage.setItem('accessToken', token);
  }
  setRefreshToken(refreshToken: string) {
		this.loginData.refreshToken = refreshToken;
		localStorage.setItem('refreshToken', refreshToken);
  }
  setExpiresIn(expiresIn: number) {
		this.loginData.expiresIn = expiresIn;
		localStorage.setItem('expiresIn', this.loginData.expiresIn.toString());
	}
  
}

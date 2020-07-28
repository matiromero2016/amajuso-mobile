import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/user.interface';
import { BaseService } from '../base.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

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
	  
	  constructor(
		private http : HttpClient, 
		private userService: UserService, 
		private router : Router) {
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

   async loginWithRefreshToken() {
	const loginData = {
		userID: this.userService.getUserData()["Email"],
		accessKey: this.getRefreshToken(),
		grantType: 'refresh_token'
	}
	   const data = await this.http.post(environment['API_URL'] + '/api/Login', loginData).toPromise();
	   if (data['accessToken'] && data['refreshToken']) {
		   this.afterLogin(data['accessToken'], data['refreshToken'], data['expiresIn']);
		await this.userService.refreshUserData().toPromise();
		// this.isLoggedIn.next(true);

		return data;
	} else {
		return false;
	}
   }

   afterLogin(accessToken: string, refreshToken: string, expiresIn: number ) : void {
		this.setToken(accessToken);
		this.setRefreshToken(refreshToken);
		this.setExpiresIn(expiresIn);
	}

	signUp(usuario : IUser) : Observable<IUser> {
		usuario.role = "Visitor";
		usuario.terms = 1;
		let response =this.http.post(environment.API_URL + '/api/users', usuario)
			.pipe(
				map(this.extractData),
				catchError(this.serviceError)
				);
				return response;
	}

	async logout() {
		try {
			await this.http.post(environment['API_URL'] + '/api/Login/logout', {}).toPromise();
			// this.isLoggedIn.next(false);
			this.clearData();
			this.router.navigate(['/login'], {replaceUrl: true});
		} catch (error) {
			console.error('logout:', error);
			// this.isLoggedIn.next(false);
			this.clearData();
			this.router.navigate(['/login'], {replaceUrl: true});
		}
	}

  getInitialTokenCredentials() : boolean {
	  this.loginData = {
		  accessToken: localStorage.getItem(this.accessToken),
		  refreshToken: localStorage.getItem(this.refreshToken),
		  expiresIn: Number(localStorage.getItem(this.expiresIn)),
	  }
	  return this.loginData.accessToken ? true : false;
  }

  getToken() {
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
  clearData() {
		this.loginData = null;
		localStorage.clear();
	}	
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user : IUser;
  constructor(private http : HttpClient) {
    // this.initUser();
   }
  
  //  initUser() {

  //  }

   getUserInfo() {
    return this.http.get(environment['API_URL'] + '/api/Users');
   }
   
   refreshUserData() : Observable<any>{
    let request = this.getUserInfo();
    request.subscribe(response => this.setUserData(response));
    return request;
   };

   setUserData(user:IUser) {
     localStorage.setItem('user', JSON.stringify(user));
   }

   getUserData() {
     return JSON.parse(localStorage.getItem('user'));
   }
   isAdmin() {
    let user = this.getUserData();
    console.log('user', user);
    if (user && user.role == 'Administrator') 
      return true;
    else 
      return false;
   }


}

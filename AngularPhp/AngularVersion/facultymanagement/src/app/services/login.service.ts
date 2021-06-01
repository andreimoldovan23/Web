import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service.service';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl : string = `${this.utils.baseUrl}login.php`;
  private logOutUrl : string = `${this.utils.baseUrl}logout.php`;

  constructor(
    private utils: AbstractService
  ) { }

  getLogin(loginDetails: Login) : Observable<any> {
    const url = `${this.loginUrl}?name=${loginDetails.name}&password=${loginDetails.password}&isTeacher=${loginDetails.isTeacher}`;
    return this.utils.addItem<Login>(loginDetails, url);
  }

  logOut() : Observable<any> {
    return this.utils.addItem<any>("", this.logOutUrl);
  }
  
}

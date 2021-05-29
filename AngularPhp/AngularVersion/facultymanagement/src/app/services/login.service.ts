import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service.service';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl : string = `${this.utils.baseUrl}login.php`;

  constructor(
    private utils: AbstractService
  ) { }

  getLogin(loginDetails: Login) : Observable<number> {
    const url = `${this.baseUrl}?name=${loginDetails.name}&password=${loginDetails.password}&isTeacher=${loginDetails.isTeacher}`;
    const errorMessage = `login w/ username=${loginDetails.name}, password=${loginDetails.password}, isTeacher=${loginDetails.isTeacher}`;
    return this.utils.getOneItem<number>(url, errorMessage);
  }
  
}

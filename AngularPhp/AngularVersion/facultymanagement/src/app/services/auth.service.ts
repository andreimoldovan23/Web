import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url: string;

  constructor(private service: AbstractService) { 
    this.url = `${this.service.baseUrl}isAuthenticated.php`;
  }

  isAuthenticated(userType: string) : Observable<any> {
    const url = `${this.url}?userType=${userType}`;
    return this.service.getOneItem<any>(url);
  }

}

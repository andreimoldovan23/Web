import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {
  baseUrl : string = "http://localhost:8081/Homework/AngularVersion/api/";

  options = {
      headers: new HttpHeaders({"Content-Type": "application/json"})
  };
  
  constructor(private http : HttpClient) {}

  private handleError<T>(operations="operations", result ?: T) {
      return (error : any) : Observable<T> => {
          window.alert(operations);
          return of(result as T);
      }
  }

  getItems<T>(url : string, operationName : string) : Observable<T[]> {
      return this.http.get<T[]>(url)
          .pipe(
            catchError(this.handleError<T[]>(operationName, []))
          );
  }

  getOneItem<T>(url : string, operationName : string) : Observable<T> {
    return this.http.get<T>(url)
        .pipe(
          catchError(this.handleError<T>(operationName))
        );
}
  
  updateItem<T>(item: T, url: string, operationName: string): Observable<any> {
      return this.http.put(url, item, this.options)
        .pipe(
            catchError(this.handleError<T>(operationName))
        );
  }
  
  addItem<T>(item: T, url: string, operationName: string): Observable<any> {
      return this.http.post<T>(url, item, this.options)
        .pipe(
            catchError(this.handleError<T>(operationName))
        );
  }
  
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {
  baseUrl : string = "http://localhost:8081/Homework/AngularVersion/api/";

  options = {
      headers: new HttpHeaders({"Content-Type": "application/json"}),
      withCredentials: true
  };
  
  constructor(private http : HttpClient) {}

  private handleError<T>(result ?: T) {
    return (error : any) : Observable<T> => {
        if (error.status === 401) {
          Swal.fire("Forbidden", "Your session has expired. Please log back in", "error")
        } else {
          Swal.fire("Not found", "The requested resource was not found", "error");
        }
        return of(result as T);
    }
}

  getItems<T>(url : string) : Observable<T[]> {
      return this.http.get<T[]>(url, this.options)
      .pipe(
        catchError(this.handleError<T[]>([]))
      );
  }

  getOneItem<T>(url : string) : Observable<T> {
    return this.http.get<T>(url, this.options)
    .pipe(
      catchError(this.handleError<T>())
    );
}
  
  updateItem<T>(item: T, url: string): Observable<any> {
      return this.http.put<T>(url, item, this.options)
        .pipe(
          catchError(this.handleError<T>())
        );
  }
  
  addItem<T>(item: T, url: string): Observable<any> {
      return this.http.post<T>(url, item, this.options)
        .pipe(
          catchError(this.handleError<T>())
        );
  }
  
}

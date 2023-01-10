import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../module/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServer = 'https://jsonplaceholder.typicode.com/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {

  }
  getAll(): Observable<any>  {
    return this.http.get<User[]>(this.apiServer)
      .pipe(
        catchError(this.errorHandler)
    )
  }

  errorHandler(error: any): any {
    let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(() => error);
  }
}

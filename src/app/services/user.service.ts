import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../store/user';
import { catchError, Observable, throwError } from 'rxjs';

type ReturnedData = {
  email: string;
  id: number;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000';
  user = new User();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.user.getToken()}`
    })
  }

  constructor(private http: HttpClient) { }

  getId(): Observable<any> {
    return this.http.get<ReturnedData>(`${this.apiUrl}/api/user`, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  getProfileImage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/profile_picture`, this.httpOptions)
    .pipe(catchError(this.errorHandler))
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

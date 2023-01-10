import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

type ReturnedToken = {
  token: string;
}

interface Params {
  username: string;
  password: string;
}

interface SignUpParams extends Params {
  email: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiServer = 'http://localhost:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  signUp(body: Params): Observable<any> {
    return this.http.post<ReturnedToken>(`${this.apiServer}/api/signup`, body)
    .pipe(catchError(this.errorHandler))
  }
  
  login(body: Params): Observable<any> {
    return this.http.post<ReturnedToken>(`${this.apiServer}/api/login`, body)
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

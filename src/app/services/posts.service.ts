import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../module/post';
import { User } from '../store/user';


type Data = {
  title: string;
  body: string;
}


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:8000';
  user = new User();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.user.getToken()}`
    })
  }
  httpFileOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${this.user.getToken()}`
    })
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/posts`, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  getUserPosts(): Observable<any> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/user_post`)
    .pipe(catchError(this.errorHandler))
  }
  
  getPost(id: number): Observable<any> {
    return this.http.get<Post>(`${this.apiUrl}/api/post/${id}`, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  createPost(data: Data): Observable<any> {
    return this.http.post<Post>(`${this.apiUrl}/api/posts`, data, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }
  updatePost(id: number, data: Data): Observable<any> {
    return this.http.put<Post>(`${this.apiUrl}/api/post/${id}`, data, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }
  deletePost(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/api/post/${id}`, this.httpOptions)
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

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://comic-flick-833dd2e0dd28.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );  
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

  public userLogin(userDetails: any): Observable<any> {
    // const token = localStorage.getItem('');
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/:title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/directors/:directorsName', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/genres/:genreName', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + '/users/:Username/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:Username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:userName/movies/:MovieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

// Non-typed response extraction
  private extractData(res: any): any {
    const body = res;
    return body || { };
  }
}
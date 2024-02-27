import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://comic-flick-833dd2e0dd28.herokuapp.com/';

/**
 * Injectable decorator marks a class as available to be injected into another class.
 * It provides metadata that allows Angular to inject dependencies into the constructor.
 * providedIn: 'root' specifies that the service should be provided and created at the root level.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   *This will provide HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient) {}

  /**
   * Makes an API call for user registration.
   * @param userDetails - Details of the user to be registered.
   * @returns An Observable with the response data.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Makes an API call for user login.
   * @returns An Observable with the response data.
   */
  public userLogin(userDetails: any): Observable<any> {
    // const token = localStorage.getItem('');
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the API.
   * @returns An Observable with the response data.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Retrieves a single movie by title from the API.
   * @returns An Observable with the response data.
   */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/:title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Retrieves movies by director's name from the API.
   * @returns An Observable with the response data.
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/directors/:directorsName', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Retrieves movies by genre name from the API.
   * @returns An Observable with the response data.
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/genres/:genreName', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Retrieves user details from the API.
   * @returns An Observable with the response data.
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Retrieves favorite movies for a user from the API.
   * @returns An Observable with the response data.
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + '/users/:Username/movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Updates user details via the API.
   * @returns An Observable with the response data.
   */
  updateUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Deletes a user via the API.
   * @returns An Observable with the response data.
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  /**
   * Deletes a movie from a user's favorites list via the API.
   * @returns An Observable with the response data.
   */
  deleteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/:userName/movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractData(res: any): any {
    const body = res;
    return body || {};
  }
}

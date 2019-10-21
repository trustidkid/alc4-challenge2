import { Injector, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IMovies } from './movies';
import { Observable, throwError } from 'rxjs';
import {tap, catchError,map} from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})

export class MoviesService{

  private moviesUrl = '/api/movies/movie.json';//api/movies/movie.json';

  constructor(private httpClient: HttpClient){}

 getMovies():Observable<IMovies[]>{
   return this.httpClient.get<IMovies[]>(this.moviesUrl).pipe(
     tap(data => console.log("ALL" + JSON.stringify(data))),
     catchError(this.handleError)

   );
  }

  getMovie(id: number): Observable<IMovies | undefined> {
    return this.getMovies()
      .pipe(
        map((mov: IMovies[]) => mov.find(p => p.movieId === id))
      );
  }

  handleError(err: HttpErrorResponse){
    let errorMessage = "";
    //in production we may send the error to remote logging server instead
    //of just logging in to console.
    if(err.error instanceof ErrorEvent){
      //A client-side or network error occurred. Handled it accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else{
      //the back end return an unsuccessfull response
      //the respond body may contain what went wrong
      errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;

    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}

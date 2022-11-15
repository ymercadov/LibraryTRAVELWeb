import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Autor } from '../entidades/autores';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://localhost:44330/api/autores";

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  Autores: any=[] = [];
  unaAutor: Autor;

  constructor(private http: HttpClient) { }
 
   getAutores (): Observable<Autor[]> {
     return this.http.get<Autor[]>(apiUrl)
       .pipe(
         tap(res => console.log('Fetch Autores')),
         catchError(this.handleError('getAutores', []))
       );
   }

   getAutor(id: number): Observable<Autor> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Autor>(url).pipe(
      tap(_ => console.log(`fetched Autor id=${id}`)),
      catchError(this.handleError<Autor>(`getAutor id=${id}`))
    );
  }

  addAutor (autor): Observable<Autor> {
    return this.http.post<Autor>(apiUrl, autor, httpOptions).pipe(
      tap((autor: Autor) => console.log(`added Autor w/ id=${autor.id}`)),
      catchError(this.handleError<Autor>('addAutor'))
    );
  }

  updateAutor (id, autor): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, autor, httpOptions).pipe(
      tap(_ => console.log(`updated Autor id=${id}`)),
      catchError(this.handleError<any>('updateAutor'))
    );
  }

  deleteAutor (id) {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Autor>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Autor id=${id}`)),
      catchError(this.handleError<Autor>('deleteAutor'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

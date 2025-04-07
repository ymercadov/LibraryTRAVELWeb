import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Libro } from '../entidades/libros';    


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
//const apiUrl = "https://localhost:44330/api/libros";
const apiUrl = "https://localhost:5001/api/libros";

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  libros: any=[] = [];
  unlibro: Libro;

  constructor(private http: HttpClient) { }
 
   getLibros (): Observable<Libro[]> {
     return this.http.get<Libro[]>(apiUrl)
       .pipe(
         tap(res => console.log('Fetch libros')),
         catchError(this.handleError('getLibros', []))
       );
   }

   getLibro(isbn: number): Observable<Libro> {
    const url = `${apiUrl}/${isbn}`;
    return this.http.get<Libro>(url).pipe(
      tap(_ => console.log(`fetched libro isbn=${isbn}`)),
      catchError(this.handleError<Libro>(`getLibro id=${isbn}`))
    );
  }

  addLibro (libro, autores): Observable<Libro> {
    
    libro.autores = autores;

    console.log("validando valor");
    console.log(libro);
    return this.http.post<Libro>(apiUrl, libro, httpOptions).pipe(
      tap((libro: Libro) => console.log(`added libro w/ id=${libro.isbn}`)),
      catchError(this.handleError<Libro>('addLibro'))
    );
  }
  
  updateLibro (id, libro, autores): Observable<any> {
    const url = `${apiUrl}/${id}`;
    libro.autores = autores;
    return this.http.put(url, libro, httpOptions).pipe(
      tap(_ => console.log(`updated Libro id=${id}`)),
      catchError(this.handleError<any>('updateLibro'))
    );
  }

  deleteLibro (id) {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Libro>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted libro id=${id}`)),
      catchError(this.handleError<Libro>('deleteLibro'))
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

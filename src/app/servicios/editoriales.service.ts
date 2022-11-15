import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Editorial } from '../entidades/editoriales';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://localhost:44330/api/Editoriales";

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

    editoriales: any=[] = [];
    unaeditorial: Editorial;

    constructor(private http: HttpClient) { }
  
    getEditoriales (): Observable<Editorial[]> {
      return this.http.get<Editorial[]>(apiUrl)
        .pipe(
          tap(res => console.log('Fetch Editoriales')),
          catchError(this.handleError('getEditoriales', []))
        );
    }

    getEditorial(id: number): Observable<Editorial> {
      const url = `${apiUrl}/${id}`;
      return this.http.get<Editorial>(url).pipe(
        tap(_ => console.log(`fetched Editorial id=${id}`)),
        catchError(this.handleError<Editorial>(`getEditorial id=${id}`))
      );
    }

    addEditorial (editorial): Observable<Editorial> {
      return this.http.post<Editorial>(apiUrl, editorial, httpOptions).pipe(
        tap((editorial: Editorial) => console.log(`added Editorial w/ id=${editorial.id}`)),
        catchError(this.handleError<Editorial>('addEditorial'))
      );
    }

    updateEditorial (id, editorial): Observable<any> {
      const url = `${apiUrl}/${id}`;
      return this.http.put(url, editorial, httpOptions).pipe(
        tap(_ => console.log(`updated Editorial id=${id}`)),
        catchError(this.handleError<any>('updateEditorial'))
      );
    }

    deleteEditorial (id) {
      const url = `${apiUrl}/${id}`;
      return this.http.delete<Editorial>(url, httpOptions).pipe(
        tap(_ => console.log(`deleted Editorial id=${id}`)),
        catchError(this.handleError<Editorial>('deleteEditorial'))
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

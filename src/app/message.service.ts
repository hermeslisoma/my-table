import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {  }
  httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // get json data from file
  getData(start, end): Observable<any> {
    const result = this.http.get('assets/sample_data.json')
        .pipe(map((data: any) => {
            const datapage = (end === 0) ? data.slice(start) : data.slice(start, end);
            return {total: data.length,
                  messages : datapage};
        }),
          catchError(this.handleError));
    return result;
  }

  // post id and status
  sendData(id, status): Observable<any> {
    return this.http.post('api/submit', {id, status}, this.httpOptions)
        .pipe(catchError(this.handleError));
  }
}

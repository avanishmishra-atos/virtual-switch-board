import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Switch } from './switch';

@Injectable()
export class SwitchService {
  private adafruitHost = 'https://io.adafruit.com'; // URL to adafruit ifttt server
  private adafruitFeedApi = '/api/v2/mishraavanishs/feeds'; // adafruit feed api
  private adafruitIOKey = 'd6093f46741f42598a47eb732ea4d987'; // adafruit key

  private iftttHostUrl = 'https://maker.ifttt.com/trigger/';  // URL to adafruit ifttt server
  private iftttKey = 'gsI_VpfmBwW39P8BF_Q-BYX7o5L-6uqIWKPyjiPdFyc';  // adafruit websocket key

  constructor(
    private http: HttpClient) { }

  /** GET swtich details from the adafruit io server */
  getSwitchesStatus<T>(): Observable<any> {
    const adafruitHttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-AIO-Key': this.adafruitIOKey })
    };

    return this.http.get<Switch[]>(this.adafruitHost + this.adafruitFeedApi, adafruitHttpOptions)
      .pipe(
        tap(_ => console.log('fetched switch details from Adafruit IO Server')),
        catchError(this.handleError<Switch[]>('getSwitchesStatus', []))
      );
  }

  /** POST: add a new hero to the server */
  changeSwitchStatus<T>(triggerName: string, value: string): Observable<any> {
    const url = this.iftttHostUrl + triggerName + '/with/key/' + this.iftttKey + '/';
    const httpParams: any = { 'value1': value, 'value2': '', 'value3': '' };

    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    return this.http.get(url, { headers, params: httpParams })
      .pipe(
        tap(_ => console.log('changed switch status')),
        catchError(this.handleError<Switch[]>('changeSwitchStatus', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

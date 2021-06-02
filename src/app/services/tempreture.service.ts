import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class TempretureService {

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    constructor( private http: HttpClient  ) {
        
      }

      getConvertedTempreture( tempFrom:number, tempTo:number, temp:number) {
        return this.http.get<number>(
            environment.apiEndpoint+tempFrom+"/"+tempTo+"/"+temp
        );
      }
 
  }
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { UsersModel } from '../../models/concrete/entity-models/users.model';
import { UsersUrl } from '../url/entity-models-url/users.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UsersModel, UsersUrl> {
  
  constructor(http: HttpClient) {
    super(http, new UsersUrl());

  }

  getUser(email:string):Observable<UsersModel>{
    const param = new HttpParams().set('email',email);

    return this._http.post<UsersModel>(this._url._getUser(),null,{params:param}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    );
  }
}

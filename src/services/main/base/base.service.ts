import { Injectable } from '@angular/core';
import { BaseModelInterface } from '../../../models/abctract/base-model.interface';
import { BaseUrl } from '../../url/base-url';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<TModel extends BaseModelInterface, TUrl extends BaseUrl > {
  constructor(protected _http: HttpClient,protected _url: TUrl) {
    
  }

  // create update delete and gets

  //#region base Methods
    create(model:TModel):Observable<TModel>{
      return this._http.post<TModel>(this._url._create(),model).pipe(
        catchError(error=>{
          console.error(`[${this.constructor.name}]:${error.message}`);
          return throwError(()=>error);
        })
      );
    }

    update(model:TModel):Observable<TModel>{
      return this._http.put<TModel>(this._url._update(),model).pipe(
        catchError(error=>{
          console.error(`[${this.constructor.name}]:${error.message}`);
          return throwError(()=>error);
        })
      );
    }

    delete(id:number):Observable<string>{
      return this._http.delete<string>(`${this._url._delete()}/${id}`).pipe(
        catchError(error=>{
          console.error(`[${this.constructor.name}]:${error.message}`);
          return throwError(()=>error);
        })
      );
    }

    getById(id:number):Observable<TModel>{
      return this._http.get<TModel>(
        this._url._get()+`/${id}`
      ).pipe(
        catchError(error=>{
          console.error(`[${this.constructor.name}]:${error.message}`);
          return throwError(()=>error);
        })
      );
    }

    getAll():Observable<TModel[]>{
      return this._http.get<TModel[]>(
        this._url._getAll()
      ).pipe(
        catchError(error=>{
          console.error(`[${this.constructor.name}]:${error.message}`);
          return throwError(()=>error);
        })
      );
    }

  //#endregion
}

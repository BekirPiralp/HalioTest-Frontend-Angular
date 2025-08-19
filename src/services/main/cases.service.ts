import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { CasesModel } from '../../models/concrete/entity-models/cases.model';
import { CasesUrl } from '../url/entity-models-url/cases.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasesService extends BaseService<CasesModel,CasesUrl>{

  constructor(http:HttpClient) {
    super(http,new CasesUrl());
    
  }

  getBySearchtoDescription(searchKey:string){
    const params = new HttpParams().set("searchKey",searchKey)
    .set("orderField","id").set("desc",false);
    
    return this._http.post<CasesModel[]>(this._url._getByFilterByOrderByRemoved(),
    ["finishDate","id","startDate","name","openedUserId","openedUser"],{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }

  getByName(name:string):Observable<CasesModel[]>{
    const params = new HttpParams().set("searchKey",name)
    .set("orderField","id").set("desc",false);
    
    return this._http.post<CasesModel[]>(this._url._getByFilterByOrderByRemoved(),
    ["finishDate","id","startDate","openedUserId","openedUser","description"],{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }

  getByUserId(id:number){
    const params = new HttpParams().set("searchKey",id)
    .set("orderField","id").set("desc",false);
    
    return this._http.post<CasesModel[]>(this._url._getByFilterByOrderByRemoved(),
    ["finishDate","id","startDate","name","openedUser","description"],{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }
}

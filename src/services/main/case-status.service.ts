import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { CaseStatusModel } from '../../models/concrete/entity-models/case-status.model';
import { CaseStatusUrl } from '../url/entity-models-url/case-status.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseStatusService extends BaseService<CaseStatusModel,CaseStatusUrl> {
  
  constructor(http:HttpClient) {
    super(http,new CaseStatusUrl());
  }
  getBySearchtoDescription(searchKey:string){
    const params = new HttpParams().set("searchKey",searchKey)
    .set("orderField","date").set("desc",true);
    
    return this._http.post<CaseStatusModel[]>(this._url._getByFilterByOrderByRemoved(),
    ["cases","caseId","date","status","id"],{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }

  getOrderedDateDesc():Observable<CaseStatusModel[]>{
    //date göre ters sıralı halde getir
    const params = new HttpParams().set("orderField","date")
                  .set("desc",true);

    return this._http.get<CaseStatusModel[]>(this._url._getByOrder(),{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }

  getByCaseIdOrderedDateDesc(caseId:number){
    const params = new HttpParams().set("searchKey",caseId)
    .set("orderField","date").set("desc",true);
    
    return this._http.post<CaseStatusModel[]>(this._url._getByFilterByOrderByRemoved(),
    ["cases","statusDescription","date","status","id"],{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }
}

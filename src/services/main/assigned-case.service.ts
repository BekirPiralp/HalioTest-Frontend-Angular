import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { AssignedCaseModel } from '../../models/concrete/entity-models/assigned-case.model';
import { AssignedCaseUrl } from '../url/entity-models-url/assigned-case.url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignedCaseService extends BaseService<AssignedCaseModel,AssignedCaseUrl> {
  constructor(http:HttpClient) {
    super(http,new AssignedCaseUrl());
  }
  
  getByUserId(id:number):Observable<AssignedCaseModel[]>{
    const params = new HttpParams().set("searchKey",`${id}`)
    .set("orderField","id").set("desc",false);
    
    return this._http.post<AssignedCaseModel[]>(this._url._getByFilterByOrderByRemoved(),
    ["caseId","cases","description","id","user"],{params:params}).pipe(
      catchError((error:Error)=>{
        console.error(`[${this.constructor.name}]: ${error.message}`);
        return throwError(()=>error);
      })
    )
  }
}

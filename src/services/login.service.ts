import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AppUrl } from './url/app-url';
import { UsersModel } from '../models/concrete/entity-models/users.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http:HttpClient) {
    
  }
  
  Login(email:string, password:string):Observable<boolean>{
    const params = new HttpParams().set("email",email).set("password",password); 
    return this._http.post<boolean>(AppUrl.Login,null,{params}).pipe(
      catchError(err=>{
        console.error(`[${this.constructor.name}]: ${err.message}`);
        return throwError(()=>err);
      })
    )
  }

  Register(user:UsersModel):Observable<boolean>{
    return this._http.post<boolean>(AppUrl.Register,user).pipe(
      catchError(err=>{
        console.error(`[${this.constructor.name}]: ${err.message}`);
        return throwError(()=>err);
      })
    )
  }
}

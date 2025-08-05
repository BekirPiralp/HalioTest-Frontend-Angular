import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersModel } from '../../../../../models/concrete/entity-models/users.model';
import { HttpClient } from '@angular/common/http';
import { AppUrl } from '../../../../../services/url/app-url';
import alertify from 'alertifyjs';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(private _http: HttpClient, private _router:Router) {


  }

  protected _user: UsersModel = new UsersModel(0, '', '', '', '', '');

  onSubmit() {
    this._http.post<boolean>(AppUrl.Register, this._user).pipe(
      catchError((err: Error) => {
        console.error(`[${this.constructor.name}]: ${err.message}`);
        return throwError(() => err);
      })
    ).subscribe(
      {
        next: (respose) => {
          if (respose)
            alertify.success("Kayı başarılı");
          else
            alertify.error("Kimi bilgileriniz le kayıtlı bir kullanıcı var");
        }
      }
    );
  }


  onCancel() {
    this._router.navigate(["/login"]);
}


}

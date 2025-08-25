import { Injectable } from '@angular/core';
import { UsersModel } from '../../models/concrete/entity-models/users.model';
import alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private router:Router){

  }

  private user: UsersModel | undefined;
  /**
   * This Method getting to user of logined
   */
  get loginedUser() {
    const storedUser = localStorage.getItem('user');

    if (storedUser)
      this.user = JSON.parse(storedUser) as UsersModel;
    return this.user;
  }

  //
  set loginedUser( value){
    //todo:
  }

  logout(){
    alertify.error("Çıkış yapılıyor")
    localStorage.clear();
    this.router.navigate(["/login"])
  }

}

import { Injectable } from '@angular/core';
import { UsersModel } from '../../models/concrete/entity-models/users.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

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

}

import { Component, EventEmitter, Output } from '@angular/core';
import { DefaultFilterKeys } from '../../../../../models/concrete/other/default-filter-keys';
import { UsersModel } from '../../../../../models/concrete/entity-models/users.model';

@Component({
  selector: 'app-home-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  
  constructor(){
    const storedUser = localStorage.getItem('user');
        
        if(storedUser)
          this.user = JSON.parse(storedUser) as UsersModel;  
  }
  
  protected fKeys=DefaultFilterKeys;

  @Output() filterKey= new EventEmitter<string>();

  protected user:UsersModel|undefined;

  protected filterKeySet(arg0: DefaultFilterKeys) {
    switch(arg0){
      case DefaultFilterKeys.openedUser:
      case DefaultFilterKeys.asignedUser:
        if(this.user)
        this.filterKey.emit(arg0+this.user.name+"-"+this.user.surName);
        break;
      case DefaultFilterKeys.default:
      default:
        this.filterKey.emit(DefaultFilterKeys.default)
        break;
    }
  }

}

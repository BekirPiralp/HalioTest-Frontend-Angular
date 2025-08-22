import { Component, EventEmitter, Output } from '@angular/core';
import { DefaultFilterKeys } from '../../../../../models/concrete/other/default-filter-keys';
import { UsersModel } from '../../../../../models/concrete/entity-models/users.model';
import { FilterService } from '../../../../tools/combo-box/services/filter.service';
import { CaseFormModalService } from '../../../../tools/case-form/services/case-form-modal.service';
import { LocalStorageService } from '../../../../../services/other/local-storage.service';

@Component({
  selector: 'app-home-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  
  constructor(private filterSevice:FilterService, private caseFormModalService:CaseFormModalService,_localStorageService:LocalStorageService){
    const storedUser = localStorage.getItem('user');
        
        if(storedUser)
          this.user = JSON.parse(storedUser) as UsersModel;  
    this.user = _localStorageService.loginedUser;
  }
  
  protected fKeys=DefaultFilterKeys;

  protected user:UsersModel|undefined;

  protected filterKeySet(arg0: DefaultFilterKeys) {
    console.log("opeden to method name of filter key set")
    console.log(this.user)
    if(!this.user){
      this.user = UsersModel.prototype
      this.user.name="Christopher";
      this.user.surName="Sanchez";
    }

    switch(arg0){
      case DefaultFilterKeys.openedUser:
      case DefaultFilterKeys.asignedUser:
        if(this.user)
          this.filterSevice.selectKey$={key:arg0+this.user.name+"-"+this.user.surName,isExtraProccess:true};
        break;
      case DefaultFilterKeys.default:
      default:
        this.filterSevice.selectKey$={key:DefaultFilterKeys.default}
        break;
    }
  }

  openCaseForm() {
    this.caseFormModalService.open();
  }

}

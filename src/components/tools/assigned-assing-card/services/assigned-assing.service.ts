import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CasesModel } from '../../../../models/concrete/entity-models/cases.model';
import { AssignedCaseModel } from '../../../../models/concrete/entity-models/assigned-case.model';
import { UsersModel } from '../../../../models/concrete/entity-models/users.model';
import { CaseStatusModel } from '../../../../models/concrete/entity-models/case-status.model';

@Injectable({
  providedIn: 'root'
})
export class AssignedAssingService {
  //case
  private _caseSubject = new BehaviorSubject<CasesModel|undefined>(undefined);

  get caseForAssigned$():Observable<CasesModel|undefined>{
    return this._caseSubject.asObservable();
  }

  set caseForAssigned$(value:CasesModel|undefined){
    this._caseSubject.next(value);
  }

  //assigned
  private _assignedSubject = new BehaviorSubject<AssignedCaseModel|undefined>(undefined);

  get assignedCase$():Observable<AssignedCaseModel|undefined>{
    return this._assignedSubject.asObservable();
  }

  set assignedCase$(value:AssignedCaseModel|undefined){
    this._assignedSubject.next(value);
  }

  //User
  private _userSubject = new BehaviorSubject<UsersModel|undefined>(undefined);

  get assignedUser$():Observable<UsersModel|undefined>{
    return this._userSubject.asObservable();
  }

  set assignedUser$(value:UsersModel|undefined){
    this._userSubject.next(value);
  }

  //Display
  private _displaySubject = new BehaviorSubject<boolean>(false);

  get display$():Observable<boolean>{
    return this._displaySubject.asObservable();
  }

  set display$(value:boolean){
    this._displaySubject.next(value);
  }

  //CaseStatus
  private _statusSubject = new BehaviorSubject<CaseStatusModel|undefined>(undefined);

  get caseStatus$():Observable<CaseStatusModel|undefined>{
    return this._statusSubject.asObservable();
  }

  set caseStatus$(value:CaseStatusModel){
    this._statusSubject.next(value);
  }
  
}

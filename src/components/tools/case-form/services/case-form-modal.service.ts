import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseFormModalService {
  private caseFormModalSubject = new BehaviorSubject<boolean>(false);
  
  get isOpen$(){ return this.caseFormModalSubject.asObservable();}

  open(){
    this.caseFormModalSubject.next(true);
  }

  close(){
    this.caseFormModalSubject.next(false);
  }

  get isOpenInstant(){
    return this.caseFormModalSubject.value;
  }

}

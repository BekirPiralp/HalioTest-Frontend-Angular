import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CasesModel } from '../../../../../../models/concrete/entity-models/cases.model';

@Injectable({
  providedIn: 'root'
})
export class ListCaseService {
  private listCaseSubject = new BehaviorSubject<CasesModel[]|undefined>(undefined);

  /**
   * Case filter içi list case set eder, diğer aboneleri haberdar eder
   */
  set listCase$(value:CasesModel[]|undefined){
    this.listCaseSubject.next(value);
  }

  /**
   * List case'den haberdar olmak için abone olun
   */
  get listCase$():Observable<CasesModel[]|undefined>{
    return this.listCaseSubject.asObservable();
  }

}

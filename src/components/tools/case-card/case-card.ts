import { Component, Input } from '@angular/core';
import { CaseStatusModel } from '../../../models/concrete/entity-models/case-status.model';
import { CaseStatus } from '../../../models/concrete/other/case-status';
import { CasesModel } from '../../../models/concrete/entity-models/cases.model';
import { CaseStatusService } from '../../../services/main/case-status.service';
import { AssignedCaseService } from '../../../services/main/assigned-case.service';
import { AssignedCaseModel } from '../../../models/concrete/entity-models/assigned-case.model';

@Component({
  selector: 'app-tool-case-card',
  imports: [],
  templateUrl: './case-card.html',
  styleUrl: './case-card.css'
})
export class CaseCard {  
  constructor( private _caseSattusService:CaseStatusService,
    private _assignedCaseService:AssignedCaseService) {    
  }

  @Input() set case(val:CasesModel){
    //kase set edlidiğinde CaseSatatuslar çekilecek ve her set ediş değiştiğinde...
    this._case=val;
    this.setCaseStatuses();
    this.setAssignedCase();
  }
  protected _more = false;
  protected _case: CasesModel | undefined;
  protected _assgnedCase : AssignedCaseModel |undefined;
  protected _caseStatuses: CaseStatusModel[] | undefined;
  

  moreClick() {
    this._more = true;
  }

  lessClick() {
    this._more = false;
  }

  getStatusText(status: number) {
    return status>0 && status<Array.from(Object.values(CaseStatus)).length ? CaseStatus[status]:"Case Status";
  }

  get getStatusNow(){
    //status listesi ters sıralı olduğu içi date göre ilk elamanı alacağız
    if(this._caseStatuses){
     return this._caseStatuses[0];
    }else{
      return undefined;
    }
  }

  get getStatusTextNow(){
    return this.getStatusNow?this.getStatusText(this.getStatusNow.status):"";
  }

  setCaseStatuses() {
    if(this._case){
      this._caseSattusService.getByCaseIdOrderedDateDesc(this._case.id).subscribe(result=>{
        if(!result || result.length <= 0){
          this._caseStatuses = undefined;
          return;
        }

        this._caseStatuses = result;
      }
      )
    }
  }

  setAssignedCase() {
    if(this._case){
      this._assignedCaseService.getByCaseId(this._case.id).subscribe(result=>{
        if(!result || result.length<=0){
          this._assgnedCase = undefined;
          return;
        }

        this._assgnedCase = result[0];
      })
    }
  }
}

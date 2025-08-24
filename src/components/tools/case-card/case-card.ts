import { Component, Input } from '@angular/core';
import { CaseStatusModel } from '../../../models/concrete/entity-models/case-status.model';
import { CaseStatus } from '../../../models/concrete/other/case-status';
import { CasesModel } from '../../../models/concrete/entity-models/cases.model';
import { CaseStatusService } from '../../../services/main/case-status.service';
import { AssignedCaseService } from '../../../services/main/assigned-case.service';
import { AssignedCaseModel } from '../../../models/concrete/entity-models/assigned-case.model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import alertify from 'alertifyjs';
import { AssignedAssingService } from '../assigned-assing-card/services/assigned-assing.service';

@Component({
  selector: 'app-tool-case-card',
  imports: [FormsModule],
  templateUrl: './case-card.html',
  styleUrl: './case-card.css'
})
export class CaseCard {
  constructor(private _caseSattusService: CaseStatusService,
    private _assignedCaseService: AssignedCaseService, private _assignedAssignService:AssignedAssingService) 
  {
    this._subscribeAssignedAssignedCase();
    this._subscribeAssignedCaseStatus();
  }

  @Input() set case(val: CasesModel) {
    //kase set edlidiğinde CaseSatatuslar çekilecek ve her set ediş değiştiğinde...
    this._case = val;
    this.setCaseStatuses();
    this.setAssignedCase();
  }
  protected _more = false;
  protected _caseStatus = CaseStatus;
  protected _case: CasesModel | undefined;
  protected _assgnedCase: AssignedCaseModel | undefined;
  protected _caseStatuses: CaseStatusModel[] | undefined;
  protected _caseStatusForCreate: CaseStatusModel | undefined;
  protected _description?: string;

  moreClick() {
    this._more = true;
  }

  lessClick() {
    this._more = false;
  }

  getStatusText(status: number) {
    return status > 0 && status < Array.from(Object.values(CaseStatus)).length ? CaseStatus[status] : "Case Status";
  }

  get getStatusNow() {
    //status listesi ters sıralı olduğu içi date göre ilk elamanı alacağız
    if (this._caseStatuses) {
      return this._caseStatuses[0];
    } else {
      return undefined;
    }
  }

  get getStatusTextNow() {
    return this.getStatusNow ? this.getStatusText(this.getStatusNow.status) : "";
  }

  setCaseStatuses() {
    if (this._case) {
      this._caseSattusService.getByCaseIdOrderedDateDesc(this._case.id).subscribe(result => {
        if (!result || result.length <= 0) {
          this._caseStatuses = undefined;
          return;
        }

        this._caseStatuses = result;
      }
      )
    }
  }

  setAssignedCase() {
    if (this._case) {
      this._assignedCaseService.getByCaseId(this._case.id).subscribe(result => {
        if (!result || result.length <= 0) {
          this._assgnedCase = undefined;
          return;
        }

        this._assgnedCase = result[0];
      })
    }
  }

  createStatus(caseStatus: CaseStatus, description?: string, ngForm?: NgForm) {
    try {
      if (ngForm && ngForm.invalid && this._case)
        throw new Error("Form invalid");

      this._caseStatusForCreate = new CaseStatusModel(0, this._case!.id, new Date(), caseStatus, description ? description : "");
      this._caseSattusService.create(this._caseStatusForCreate).subscribe(result => {
        if (!result || result.id <= 0)
          throw new Error("Result null refrence")

        // if(this._caseStatuses)
        //   this._caseStatuses = [result,...this._caseStatuses]
        // else
        //   this._caseStatuses = [result];
        this._caseStatuses = [result, ...(this._caseStatuses || [])]

        alertify.success("Case durumu başarı ile güncellendi");
      });
    } catch (error) {
      alertify.error("İşleminiz gerçekleştilemedi lütfen tekrar deneyiniz");
    }
    finally {
      this._caseStatusForCreate = undefined;
      this._description = "";
    }

  }

  _subscribeAssignedAssignedCase() {
    this._assignedAssignService.assignedCase$.subscribe(result=>{
      if(result && result.caseId == this._case?.id)
        this._assgnedCase = result;
      else
        this._assgnedCase = undefined;
    })
  }

  protected _userAssign() {
    this._assignedAssignService.display$ = true;
    this._assignedAssignService.caseForAssigned$ = this._case;
  }

  private _subscribeAssignedCaseStatus() {
    this._assignedAssignService.caseStatus$.subscribe(result=>{
      if(result && result.caseId === this._case?.id){
        this._caseStatuses = [result,...this._caseStatuses?this._caseStatuses:[]];
      }
    })
  }
}

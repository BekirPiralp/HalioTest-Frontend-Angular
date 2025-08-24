import { Component } from '@angular/core';
import { CasesModel } from '../../../models/concrete/entity-models/cases.model';
import { AssignedAssingService } from './services/assigned-assing.service';
import { UsersModel } from '../../../models/concrete/entity-models/users.model';
import { AssignedCaseModel } from '../../../models/concrete/entity-models/assigned-case.model';
import { UsersService } from '../../../services/main/users.service';
import { FormsModule } from '@angular/forms';
import { AssignedCaseService } from '../../../services/main/assigned-case.service';
import alertify from 'alertifyjs';
import { CaseStatusService } from '../../../services/main/case-status.service';
import { CaseStatusModel } from '../../../models/concrete/entity-models/case-status.model';
import { CaseStatus } from '../../../models/concrete/other/case-status';

@Component({
  selector: 'app-tool-assigned-assing-card',
  imports: [FormsModule],
  templateUrl: './assigned-assing-card.html',
  styleUrl: './assigned-assing-card.css'
})
export class AssignedAssingCard {


  constructor(private _assignedAssingService: AssignedAssingService,
    private _usersService: UsersService,
    private _assignedCasesService: AssignedCaseService,
    private _caseStatusService:CaseStatusService) {
    this.subscribeDisplay();
    this._setCase();
    this._setUsers();
  }


  protected _display: boolean = false;
  protected _case: CasesModel | undefined;
  // private _assignedCase: AssignedCaseModel | undefined;
  protected _assignDescription: string | undefined;
  private _users: UsersModel[] | undefined;
  protected _usersFiltered: UsersModel[] | undefined;
  protected _userFilterValue: string | undefined;

  private subscribeDisplay() {
    this._assignedAssingService.display$.subscribe(result => {
      this._display = result;
    })
  }

  private _setCase() {
    this._assignedAssingService.caseForAssigned$.subscribe(result => {
      this._case = result;
    })
  }

  private _setUsers() {
    this._usersService.getAll().subscribe(result => {
      if (!result || result.length <= 0)
        return;

      this._users = result;
      this._usersFiltered = result;
    })
  }

  //User filter process
  private _timerID?: number;
  protected filterUser() {
    if (this._timerID)
      clearTimeout(this._timerID);
    this._timerID = setTimeout(() => {

      if (!this._userFilterValue) {
        console.log("girdi")
        this._usersFiltered = this._users;
        return;
      }

      this._usersFiltered = this._users?.filter(u => `${u.name} ${u.surName}`.toLowerCase().includes(this._userFilterValue!.toLowerCase()));
    }, 300);
  }

  // Normally this would be selected User but here We can use parameter's name to chosen one ;D
  protected assignUserToCase(chosenOne: UsersModel) {
    try {
      // if case is not defined so undefined, we can exit method used return 
      if (!this._case)
        throw new Error("Case is undefined");

      let _assignedCase = new AssignedCaseModel(0, this._case.id, chosenOne.id, this._assignDescription ? this._assignDescription : "");

      this._assignedCasesService.create(_assignedCase).subscribe(result => {
        if (!result || result.id <= 0)
          throw new Error("Result is undefined");

        this._assignedAssingService.assignedUser$ = chosenOne;
        
        this._caseStatusService.create(new CaseStatusModel(0,this._case!.id,new Date(),CaseStatus.Assigned,`${chosenOne.name} ${chosenOne.surName}'e atandı`)).subscribe(resultStatus=>{
          if(!resultStatus || resultStatus.id<=0)
            return;

          resultStatus.cases = this._case;

          this._assignedAssingService.caseStatus$ = resultStatus;
        });
       
        result.user = chosenOne;

        this._assignedAssingService.assignedCase$ = result;

        alertify.success(`${chosenOne.name} ${chosenOne.surName}'e case başarı ile atandı.`);
      })
    } catch (error) {
      alertify.error("Kulanıcı görevlendirme işleme başarısız");
    }
    finally{
      this.close();
    }
  }


  protected close() {
    this._assignedAssingService.display$ = false;
  }

}

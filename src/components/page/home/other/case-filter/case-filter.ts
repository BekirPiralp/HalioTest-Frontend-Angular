import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Params } from '../../../../tools/combo-box/models/abstract/params';
import { FilterModel } from '../../../../tools/combo-box/models/concrete/filter-model';
import { ComboBox } from "../../../../tools/combo-box/combo-box";
import { CasesService } from '../../../../../services/main/cases.service';
import { CaseStatusService } from '../../../../../services/main/case-status.service';
import { CaseStatus } from '../../../../../models/concrete/other/case-status';
import { AssignedCaseService } from '../../../../../services/main/assigned-case.service';
import { UsersService } from '../../../../../services/main/users.service';
import { UsersModel } from '../../../../../models/concrete/entity-models/users.model';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';
import { CaseStatusModel } from '../../../../../models/concrete/entity-models/case-status.model';
import { forkJoin, of, tap } from 'rxjs';
import { DefaultFilterKeys } from '../../../../../models/concrete/other/default-filter-keys';
import { FilterListService } from '../../../../tools/combo-box/services/filter-list.service';
import { IFilterModel } from '../../../../tools/combo-box/models/abstract/ifilter-model';
import { ListCaseService } from './services/list-case.service';
import { CaseNameFilterModel } from './models/case-name-filter-model';
import { CaseDescriptionFilterModel } from './models/case-description-filter-model';
import { CaseStatusFilterModel } from './models/case-status-filter-model';
import { CaseStatusDescriptionFilterModel } from './models/case-status-description-filter-model';
import { AssignedUserFilterModel } from './models/assigned-user-filter-model';
import { OpenedUserFilterModel } from './models/opened-user-filter-model';
import { DefaultFilterModel } from './models/default-filter-model';
import { FilterService } from '../../../../tools/combo-box/services/filter.service';

@Component({
  selector: 'app-home-case-filter',
  imports: [CommonModule, FormsModule, ComboBox],
  templateUrl: './case-filter.html',
  styleUrl: './case-filter.css'
})
export class CaseFilter {

  constructor(private _caseService: CasesService,
    private _caseStatusService: CaseStatusService,
    private _assignedCaseService: AssignedCaseService,
    private _usersService: UsersService,
    private _filterListService: FilterListService,
    private _listCaseService: ListCaseService,
    private _filterService:FilterService
  ) {
    //defaul list upload edilecek
    this.defaultFilterListUpload();
    this.subscribeToFilterList();
    this.subscribeToCasesList();
  }

  private _listCase: CasesModel[] | undefined;
  protected menu: boolean = false;
  private _filterList?: Array<IFilterModel>;
  protected _fkeys =DefaultFilterKeys;

  defaultFilterListUpload() {
    this._filterList = [
      /*"@case-name:",
      "@case-description:",
      "@status:",
      "@status-description:",
      "@assigned-user:"
      "@opened-user:",*/
      new DefaultFilterModel(this._listCaseService,this._caseService),
      new CaseNameFilterModel(this._caseService, this._filterListService, this._listCaseService),
      new CaseDescriptionFilterModel(this._caseService, this._listCaseService),
      new CaseStatusFilterModel(this._caseStatusService, this._caseService, this._filterListService, this._listCaseService),
      new CaseStatusDescriptionFilterModel(this._caseStatusService, this._listCaseService),
      new AssignedUserFilterModel(this._listCaseService, this._filterListService, this._caseService, this._usersService, this._assignedCaseService),
      new OpenedUserFilterModel(this._listCaseService, this._filterListService, this._caseService, this._usersService)
    ]

    this._filterListService.filterList$=this._filterList;
  }

  subscribeToCasesList() {
    this._listCaseService.listCase$.subscribe(result => {
      this._listCase = result;
    })
  }

  subscribeToFilterList() {
    this._filterListService.filterList$.subscribe(result => {
      if (result) {
        this._filterList = result;
      }
    })
  }

  filterNavClick(arg0: string) {
    this._filterService.selectKey$={key:arg0};
  }

  menuDisplay() {
    this.menu = true;
  }
  menuHidden() {
    this.menu = false;
  }

}
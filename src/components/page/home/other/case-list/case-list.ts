import { Component,Input } from '@angular/core';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';
import { CaseCard } from "../../../../tools/case-card/case-card";
import { CommonModule } from '@angular/common';
import { ListCaseService } from '../case-filter/services/list-case.service';

@Component({
  selector: 'app-home-case-list',
  imports: [CommonModule,CaseCard],
  templateUrl: './case-list.html',
  styleUrl: './case-list.css'
})
export class CaseList {
  constructor(private _listCaseService:ListCaseService) {
    this.subscribeListCase();
  }
  
  protected _listCase:CasesModel[]|undefined = Array<CasesModel>(100);;
  
  subscribeListCase() {
    this._listCaseService.listCase$.subscribe(result=>{
      this._listCase = result;
    })
  }
}

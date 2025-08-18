import { Component,Input } from '@angular/core';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';
import { CaseCard } from "../../../../tools/case-card/case-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-case-list',
  imports: [CommonModule,CaseCard],
  templateUrl: './case-list.html',
  styleUrl: './case-list.css'
})
export class CaseList {

  @Input() set listCase(val:CasesModel[]|undefined) {
    this._listCase = val;
  }
  protected _listCase:CasesModel[]|undefined = Array<CasesModel>(100);;
}

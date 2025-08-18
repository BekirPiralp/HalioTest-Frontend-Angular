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

  @Input() listCase:CasesModel[]|undefined = Array<CasesModel>(10); //[new CasesModel(1,"testCase","test desc",new Date(),new Date(),1,undefined)];
  protected _listCase:CasesModel[]|undefined = Array<CasesModel>(100);;
}

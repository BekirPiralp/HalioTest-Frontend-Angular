import { Component, OnInit } from '@angular/core';
import { Navbar } from "../../other/navbar/navbar";
import { Sidebar } from "../../other/sidebar/sidebar";
import { CaseFilter } from "../../other/case-filter/case-filter";
import { CaseList } from "../../other/case-list/case-list";
import { CommonModule } from '@angular/common';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';
import { CasesService } from '../../../../../services/main/cases.service';
import { ListCaseService } from '../../other/case-filter/services/list-case.service';
import { CaseForm } from "../../../../tools/case-form/case-form";
import { AssignedAssingCard } from "../../../../tools/assigned-assing-card/assigned-assing-card";

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidebar, CaseFilter, CaseList, CaseForm, AssignedAssingCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private _casesService:CasesService,private _listCaseService:ListCaseService) {
    
    this._casesService.getAllDesc().subscribe((result)=>{
      this._listCases=result;
    })

    this._listCaseService.listCase$ = this._listCases;

    this.subscribeToListCases();
  }
  
  
  private _listCases:CasesModel[]|undefined;
  public set listCases(val:CasesModel[]|undefined){
    this._listCases = val;
  }
  public get listCases(){
    return this._listCases;
  }


  subscribeToListCases() {
    this._listCaseService.listCase$.subscribe(result=>{
      this._listCases=result;
    })
  }
}

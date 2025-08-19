import { Component, OnInit } from '@angular/core';
import { Navbar } from "../../other/navbar/navbar";
import { Sidebar } from "../../other/sidebar/sidebar";
import { CaseFilter } from "../../other/case-filter/case-filter";
import { CaseList } from "../../other/case-list/case-list";
import { CommonModule } from '@angular/common';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';
import { CasesService } from '../../../../../services/main/cases.service';

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidebar, CaseFilter, CaseList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private _casesService:CasesService) {
    this._casesService.getAllDesc().subscribe((result)=>{
      this._listCases=result;
    })
  }
  
  private _listCases:CasesModel[]|undefined;
  public set listCases(val:CasesModel[]|undefined){
    this._listCases = val;
    console.log(this._listCases)
  }
  public get listCases(){
    return this._listCases;
  }
}

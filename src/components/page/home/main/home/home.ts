import { Component } from '@angular/core';
import { Navbar } from "../../other/navbar/navbar";
import { Sidebar } from "../../other/sidebar/sidebar";
import { CaseFilter } from "../../other/case-filter/case-filter";
import { CaseList } from "../../other/case-list/case-list";
import { CommonModule } from '@angular/common';
import { CasesModel } from '../../../../../models/concrete/entity-models/cases.model';

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidebar, CaseFilter, CaseList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  public listCases:CasesModel[]|undefined;
}

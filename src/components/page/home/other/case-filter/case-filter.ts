import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-case-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './case-filter.html',
  styleUrl: './case-filter.css'
})
export class CaseFilter {
  _selectedKey:string|undefined;
  _filterComboValue: FilterModel | undefined;
  _filterListDefault: Array<FilterModel> = [
    /*"@case-name:",
    "@case-description:",
    "@status:",
    "@status-description:",
    "@asigned-user:",*/
    new FilterModel(
      {
        key:"@case-name:",
        func:(a)=>{
          console.log("function içi:")
          console.log(a)
          console.log(a?.toString());
          console.log("bitti");
        }
      }
    ),
    new FilterModel(
      {
        key:"@case-name:asd",
        func:(a)=>{
          console.log("function içi:")
          console.log(a)
          console.log(a?.toString());
          console.log("bitti");
        }
      }
    ),
    new FilterModel(
      <Params>{
        key:"@case-description:"
      }),
    new FilterModel({
      key:"@status:"
    }),
    new FilterModel({
      key:"@status-description:"
    }),
    new FilterModel({
      key:"@asigned-user:"
    })
  ]
  _filterList = [...this._filterListDefault];

  filterValueChange() {
    let selectedValue= this._filterList.find(p=>p.key === this._selectedKey);
    
    if(selectedValue){
      console.log(selectedValue)
      if(selectedValue.func){
        selectedValue.func(selectedValue);
      }
    }
  }
}


class FilterModel {
  constructor(
              params?: Params | undefined 
              ) {

    if (params) {
      this.key = params.key;
      this.data = params.data;
      this.func = params.func;
    }
  }
  key: string | undefined;
  data: object | undefined;
  func: ((filterModel?: FilterModel) => void) | undefined;
  protected filterModel = this;

  toString():string|undefined{
    if(this.key){
      
      let matchResult = this.key.match("@[^:]+:\s*(?<value>.*)");
      if(matchResult){
        console.log(matchResult)
        console.log(matchResult.groups?.['value']);
        return "match";
      }
    }
    return undefined;
  }
}

type Params = { key?: string,
                        data?: object, 
                        func?: ((filterModel?: FilterModel) => void )}
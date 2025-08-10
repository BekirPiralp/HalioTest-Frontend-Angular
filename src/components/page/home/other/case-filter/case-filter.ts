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
          if(!this._filterList.find(p=>p.key==="@case-name:asd"))
              this._filterList.push(...[
                new FilterModel(
                    {
                      key:"@case-name:asd",
                      func:(a)=>{
                        console.log("function içi:")
                        console.log(a)
                        console.log(a?.value);
                        console.log("bitti");
                      }
                    })
              ]);
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
    }),
    new FilterModel({
      key:"",
      func:()=>{
        this.listClear();
      }
    })
  ]
  _filterList = [...this._filterListDefault];

  filterValueChange() {
    let selectedValue= this._filterList.find(p=>p.key === this._selectedKey);
    
    if(!selectedValue) // for text copy paste
      selectedValue = this._filterList.find(p=> p.key &&this._selectedKey?.startsWith(p.key))
    
    if(selectedValue){
      console.log(selectedValue)
      console.log(this._filterList)
      if(selectedValue.func){
        selectedValue.func(selectedValue);
      }
    }else{
      console.log("girdi")
      if(this._filterList.length != this._filterListDefault.length)
      {
        this.listClear();
      }
    }
    console.log("değişimlist")
    console.log(this._filterList)
  }


  onFilterEnter() {
    this.filterValueChange(); //kopyalanan değere göre veri geldi ve liste de ise ikincil tekrar kontrol
  }


  listClear(){
    this._filterList.length=0;
    this._filterList.push(...this._filterListDefault);
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
  isdefault:boolean |undefined;
  key: string | undefined;
  data: object | undefined;
  func: ((filterModel?: FilterModel) => void) | undefined;
  protected filterModel = this;

  get value():string|undefined{
   return this.key?.match("@[^:]+:\s*(?<value>.*)")?.groups?.['value'] || undefined;
  }

  toString():string{
    return this.key ||""
  }
}

type Params = { key?: string,
                        data?: object, 
                        func?: ((filterModel?: FilterModel) => void )}
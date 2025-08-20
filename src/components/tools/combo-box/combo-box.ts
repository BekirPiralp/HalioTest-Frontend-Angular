import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IFilterModel } from './models/abstract/ifilter-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FILTER_HANDLER } from './models/tokens/filter-handler.token';
import { IFilterHandler } from './models/abstract/ifilter-handler';
import { FilterService } from './services/filter.service';
import { FilterListService } from './services/filter-list.service';

@Component({
  selector: 'app-tool-combo-box',
  imports: [CommonModule,FormsModule],
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.css'
})
export class ComboBox {

  constructor(@Inject(FILTER_HANDLER) private _filterHandler:IFilterHandler,
              private _filterService:FilterService, 
              private _filterListService:FilterListService) 
  {
    this.setSelectKeySubscribed();
    this.filterListSubscribed();
  }
  
  protected filterList?:IFilterModel[];


  _selectedKey: string|undefined;
  _extraProcess?:(()=>void);

  private _formDatalist = false; //copy paste harici yazarken enter funca girmemesi için

  filterValueChange() {

    this._formDatalist = true;

    this.filterHandle();
  }

  filterHandle(){
    this._filterService.filterSelectedKey$=this._selectedKey;

    let _selectedValue = this.filterList?.find(p=>p.key === this._selectedKey);
    
    if(!_selectedValue) // for text copy paste
      _selectedValue = this.filterList?.find(p=> p.key &&this._selectedKey?.startsWith(p.key))
    
    if(_selectedValue)
      _selectedValue.selectingKey = this._selectedKey;
    
    if(_selectedValue){
      this._filterHandler.handle(_selectedValue,this._extraProcess);
    }else{
      this._filterListService.resetFilterList();
    }
    this.extraProcessClear();
  }


  onFilterEnter() {
    if(this._formDatalist)
      this._formDatalist = false; 
    else
      this.filterHandle(); //kopyalanan değere göre veri geldi ve liste de ise ikincil tekrar kontrol
  }



  private setSelectKeySubscribed() {
    this._filterService.selectKey$.subscribe((key) => {
      console.log(key)
      this._selectedKey = key.key;
      
      if (key.isExtraProccess)
        this._extraProcess = this.filterHandle;

      setTimeout(() => {
        this.filterValueChange();
      });

        
    });
  }

  extraProcessClear(){
    this._extraProcess = undefined;
  }

  filterListSubscribed() {
    this._filterListService.filterList$.subscribe((result)=>{
      this.filterList = result;
    })
  }
}

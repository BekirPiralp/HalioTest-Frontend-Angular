import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IFilterModel } from './models/abstract/ifilter-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FILTER_HANDLER } from './models/tokens/filter-handler.token';
import { IFilterHandler } from './models/abstract/ifilter-handler';

@Component({
  selector: 'app-tool-combo-box',
  imports: [CommonModule,FormsModule],
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.css'
})
export class ComboBox {

  constructor(@Inject(FILTER_HANDLER) private _filterHandler:IFilterHandler) {
    
  }
  
  @Input() filterList?:IFilterModel[];
  @Output() filterListChange = new EventEmitter<IFilterModel[]|undefined>();
  @Output() selectedValueChange = new EventEmitter<IFilterModel|undefined>();
  @Input() requiredSecondaryProcess?:boolean = false;

  @Input()  set selectedKey(val:string|undefined){
    this._selectedKey = val;
    
    setTimeout(()=>{
      this.filterHandle();
      
      if(this.requiredSecondaryProcess){
        setTimeout(()=>{
          this.filterHandle();
        })
    }
    })
    
  }
  @Output() selectedKeyChange = new EventEmitter<string|undefined>();


  _selectedKey: string|undefined;


  


  filterValueChange() {
    this.selectedKeyChange.emit(this._selectedKey);

    this.filterHandle();
  }

  filterHandle(){
    let _selectedValue = this.filterList?.find(p=>p.key === this._selectedKey);
    
    if(!_selectedValue) // for text copy paste
      _selectedValue = this.filterList?.find(p=> p.key &&this._selectedKey?.startsWith(p.key))
    
    this.selectedValueChange.emit(_selectedValue);
    
    if(_selectedValue){
      this._filterHandler.handle(_selectedValue);
    
    }else{
      this.listClear();
    }
  }


  onFilterEnter() {
    this.filterHandle(); //kopyalanan değere göre veri geldi ve liste de ise ikincil tekrar kontrol
  }


  listClear(){
    if(this.filterList && this.filterList.some(p=>p.isDefault !==true)){
      this.filterList=this.filterList.filter(p=>p.isDefault);
      this.filterListChange.emit(this.filterList);
    }
  }
}

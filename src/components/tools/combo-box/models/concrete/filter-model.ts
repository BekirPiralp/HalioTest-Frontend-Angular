import { IFilterModel } from "../abstract/ifilter-model";
import { Params } from "../abstract/params";

export class FilterModel implements IFilterModel {
    constructor(
              params?: Params | undefined 
              ) {

    if (params) {
      this.key = params.key;
      this.data = params.data;
      this.func = params.func;
      this.isDefault = params.isDefault;
      this.isUseSelectingKey = params.isUseSelectingKey;
    }

    this._filterModel=this;
  }

  _filterModel: IFilterModel;

  isDefault:boolean |undefined;
  key: string | undefined;
  data: object | undefined;
  func: ((filterModel?: IFilterModel) => void) | undefined;
  isUseSelectingKey: boolean | undefined; 

  private _selectingKey?: string;

  set selectingKey (val:string | undefined){
    this._selectingKey = val;
  }

  get filterModel():IFilterModel{
    return this._filterModel;
  }

  get value():string|undefined{
    if(this.isUseSelectingKey)
      return this._selectingKey?.match("@[^:]+:\s*(?<value>.*)")?.groups?.['value'] || undefined;
    
    return this.key?.match("@[^:]+:\s*(?<value>.*)")?.groups?.['value'] || undefined;
  }

  toString():string{
    return this.key ||""
  }
}

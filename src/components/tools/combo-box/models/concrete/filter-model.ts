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
    }

    this._filterModel=this;
  }

  _filterModel: IFilterModel;

  isDefault:boolean |undefined;
  key: string | undefined;
  data: object | undefined;
  func: ((filterModel?: IFilterModel) => void) | undefined;

  get filterModel():IFilterModel{
    return this._filterModel;
  }

  get value():string|undefined{
   return this.key?.match("@[^:]+:\s*(?<value>.*)")?.groups?.['value'] || undefined;
  }

  toString():string{
    return this.key ||""
  }
}

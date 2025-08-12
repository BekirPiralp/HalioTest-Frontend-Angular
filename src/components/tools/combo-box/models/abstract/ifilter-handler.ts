import { IFilterModel } from "./ifilter-model";

export interface IFilterHandler {

    handle(filterModel:IFilterModel):void;
}

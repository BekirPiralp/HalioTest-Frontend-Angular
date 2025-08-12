import { IFilterHandler } from "../abstract/ifilter-handler";
import { IFilterModel } from "../abstract/ifilter-model";

export class FilterHandler implements IFilterHandler{
    handle(filterModel: IFilterModel): void {
        if(filterModel.func){
            filterModel.func(filterModel.filterModel);
        }
    }
}

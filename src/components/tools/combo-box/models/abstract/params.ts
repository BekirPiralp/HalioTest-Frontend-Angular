import { IFilterModel } from "./ifilter-model";

export type Params = { 
    key?: string,
    data?: object, 
    func?: ((filterModel?: IFilterModel,secondaryProcess?: (()=>void)) => void),
    isDefault?:boolean,
    isUseSelectingKey?: boolean
}


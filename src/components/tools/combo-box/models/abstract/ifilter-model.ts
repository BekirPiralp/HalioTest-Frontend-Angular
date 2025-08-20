export interface IFilterModel {
    isDefault:boolean|undefined;
    key: string | undefined;
    data: object | undefined;
    func: ((filterModel?: IFilterModel,secondaryProcess?: (()=>void)) => void) | undefined;

    get filterModel():IFilterModel;

    /**
     * '@' ile başlayan ':' ile biten keyden sonraki ifadeleri verir
     * @example
     * '@name:foo'
     * return to 'foo' 
     */
    get value():string|undefined;

    set selectingKey (val:string | undefined);

    toString():string;
}

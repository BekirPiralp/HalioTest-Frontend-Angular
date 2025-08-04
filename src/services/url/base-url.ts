import { AppUrl } from "./app-url";

export abstract class BaseUrl {
    protected static modelName:string;

    //#region base methods
    public static  _create():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Create`;
    }

    public static  _update():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Update`;
    }

    public static  _delete():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Delete`;
    }
    
    public static  _get():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Get`;
    }

    public static  _getByDesc():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetByDesc`;
    }

    public static  _getByFilter():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetByFilter`;
    }

    public static  _getAll():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetAll`;
    }

    public static  _getCount():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetCount`;
    }

    public static  _getCountByFilter():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetCountByFilter`;
    }
    //#endregion
}

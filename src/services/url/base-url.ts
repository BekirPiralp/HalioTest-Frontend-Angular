import { AppUrl } from "./app-url";

export abstract class BaseUrl {
    
    constructor(protected modelName:string) {
        
    }

    //#region base methods
    public   _create():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Create`;
    }

    public   _update():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Update`;
    }

    public   _delete():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Delete`;
    }
    
    public   _get():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/Get`;
    }

    public   _getByFilterDesc():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetByDesc`;
    }

    public   _getByFilter():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetByFilter`;
    }

    public   _getAll():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetAll`;
    }

    public   _getCount():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetCount`;
    }

    public   _getCountByFilter():string {
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetCountByFilter`;
    }
    //#endregion
}

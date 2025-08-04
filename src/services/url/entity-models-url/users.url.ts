import { AppUrl } from "../app-url";
import { BaseUrl } from "../base-url";

export class UsersUrl extends BaseUrl {
    constructor() {
        UsersUrl.modelName="Users";
        super();
    }

    
    /*public static override  _update():string {
            return `${AppUrl.BaseUrl}/api/${this.modelName}/Update`;
    }*/

    public static _getUser():string{
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetUser`;
    }
}

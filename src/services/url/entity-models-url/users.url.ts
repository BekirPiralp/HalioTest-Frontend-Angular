import { AppUrl } from "../app-url";
import { BaseUrl } from "../base-url";

export class UsersUrl extends BaseUrl {
    constructor() {
        super("Users");
    }

    
    /*public override  _update():string {
            return `${AppUrl.BaseUrl}/api/${this.modelName}/Update`;
    }*/

    public _getUser():string{
        return `${AppUrl.BaseUrl}/api/${this.modelName}/GetUser`;
    }
}

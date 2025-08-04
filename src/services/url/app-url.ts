export abstract class AppUrl {

    static readonly BaseUrl = "http://localhost:5266";


    //#region Login Urls

    static readonly Login = this.BaseUrl+"/Login/Login";
    static readonly Register = this.BaseUrl+"/Login/Register";

    //#endregion


    
}

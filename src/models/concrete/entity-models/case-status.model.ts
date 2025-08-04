import { BaseModelInterface } from "../../abctract/base-model.interface";
import { CasesModel } from "./cases.model";

export class CaseStatusModel implements BaseModelInterface{
    constructor(id: number,caseId:number,date: Date,status: number,
    statusDescription:string, cases?:CasesModel) {
        this.id = id;
        this.caseId = caseId;
        this.date = date;
        this.status = status;
        this.statusDescription = statusDescription;        
        
    }
    id: number;
    caseId:number;
    cases?:CasesModel;
    date: Date;
    status: number;
    statusDescription:string;

}

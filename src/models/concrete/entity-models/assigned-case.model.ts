import { BaseModelInterface } from "../../abctract/base-model.interface";
import { CasesModel } from "./cases.model";
import { UsersModel } from "./users.model";

export class AssignedCaseModel implements BaseModelInterface {
    constructor(id: number,
        caseId: number,
        userId: number,
        description: string,
        cases?: CasesModel,
        user?: UsersModel) {
            this.id = id;
            this.caseId = caseId;
            this.userId = userId;
            this.description = description;
            this.cases = cases;
            this.user = user;
    }

    id: number;
    caseId: number;
    userId: number;
    description: string;
    cases?: CasesModel;
    user?: UsersModel;
}

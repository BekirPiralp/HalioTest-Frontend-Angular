import { BaseModelInterface } from "../../abctract/base-model.interface";
import { UsersModel } from "./users.model";

export class CasesModel implements BaseModelInterface {
    constructor(id: number, name: string, description: string, 
        startDate: Date, finishDate: Date, openedUserId: number,openedUser?:UsersModel) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.startDate = startDate;
            this.finishDate = finishDate;
            this.openedUserId = openedUserId;
            this.openedUser = openedUser;

    }

    id: number;
    name: string;
    description: string;
    startDate: Date;
    finishDate: Date;
    openedUserId: number;
    openedUser?: UsersModel = undefined;
}

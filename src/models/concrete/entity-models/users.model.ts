import { BaseModelInterface } from "../../abctract/base-model.interface";

export class UsersModel implements BaseModelInterface {

    constructor(id: number, name: string, surName: string, phoneNumber: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.surName = surName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
    id: number;
    name: string;
    surName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

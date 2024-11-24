import { RolModel } from "./rol.model";

export class UserModel {
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    name!: string;
    lastName!: string;
    rol!: RolModel;
    createdAt!: Date;
    updatedAt!: Date;
    status!: boolean;
}
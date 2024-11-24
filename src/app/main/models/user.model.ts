import { RolModel } from "./rol.model";

export class UserModel {
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    rol!: RolModel;
    createdAt!: Date;
    updatedAt!: Date;
    status!: boolean;
}
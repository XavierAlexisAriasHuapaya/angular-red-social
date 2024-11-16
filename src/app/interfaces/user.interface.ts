import { Rol } from "./rol.interface";

export interface user {
    id: number;
    username: string;
    password: string;
    email: string;
    rol: Rol;
    createdAt: Date;
    updatedAt: Date;
    status: Boolean;
}
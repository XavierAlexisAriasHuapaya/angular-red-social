import { Permission } from "./permission.interface";

export interface Rol {
    id: number;
    description: string;
    permissions: Permission[];
    createdAt: Date;
    updatedAt: Date;
    status: Boolean;
}
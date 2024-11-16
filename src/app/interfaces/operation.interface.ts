import { Module } from "./module.interface";

export interface Operation {
    id: number;
    name: string;
    path: string;
    httpMethod: string;
    permitAll: string;
    module: Module;
    createdAt: Date;
    updatedAt: Date;
    status: Boolean;
}
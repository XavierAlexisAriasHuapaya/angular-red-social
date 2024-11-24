import { User } from "../../interfaces/user.interface";

export class ChatMembersModel {
    id!: number;
    user!: User;
    joinedAt!: Date;
    createdAt!: Date;
    updatedAt!: Date;
    status!: boolean;
}
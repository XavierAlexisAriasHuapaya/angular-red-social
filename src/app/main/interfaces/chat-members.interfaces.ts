import { User } from "../../interfaces/user.interface";

export interface ChatMembers {
    id: number;
    user: User;
    joinedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
}
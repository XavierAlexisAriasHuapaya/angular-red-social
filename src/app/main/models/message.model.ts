import { ChatModel } from "./chat.model";
import { UserModel } from "./user.model";

export class MessageModel {
    id!: number;
    chat!: ChatModel;
    user!: UserModel;
    content!: string;
    timeSeen!: Date;
    seen!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    status!: boolean;
}
import { ChatMembersModel } from "./chat-members.model";

export class ChatModel {
    id!: number;
    roomCode!: string;
    name!: string;
    chatType!: string;
    chatMembers!: ChatMembersModel[];
    createdAt!: Date;
    updatedAt!: Date;
    status!: boolean;
}
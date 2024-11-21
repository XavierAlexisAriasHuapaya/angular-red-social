import { ChatMembersCreate } from "./chat-members-create.interface";
import { ChatMembers } from "./chat-members.interfaces";

export interface ChatCreate {
    name: string;
    chatType: string;
    chatMembers: ChatMembersCreate[];
}
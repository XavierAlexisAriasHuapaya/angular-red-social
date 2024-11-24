import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { ChatCreate } from "./chat-create.interfaces";
import { ChatMembers } from "./chat-members.interfaces";

export interface ChatAllUser {
    chat: ChatModel;
    message: MessageModel;
    messageTime: string;
}
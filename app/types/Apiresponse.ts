import { Message } from "../models/user.model";
export interface ApiResponse{
    success : boolean,
    message : string,
    isAcceptingMessage?: boolean,
    messagae?: Array<Message>
    
}
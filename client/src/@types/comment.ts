import {User} from "./user"

export interface Comment {
    id:string,
    content:string,
    user: User,
    userId:string,
    createdAt:string,
    updatedAt:string
}

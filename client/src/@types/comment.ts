import {User} from "./user"
import {Post} from "./post"

export interface Comment {
    id:string,
    content:string,
    user: User,
    userId:string,
    post: Post,
    postId:string,
    createdAt:string,
    updatedAt:string
}

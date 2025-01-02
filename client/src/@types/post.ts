import {User} from "./user"

export interface Post {
    id:string,
    slug:string,
    user: User,
    userId:string
    title:string,
    img:string,
    views:number
    description:string,
    createdAt:string,
    updatedAt:string
    published:boolean,
}

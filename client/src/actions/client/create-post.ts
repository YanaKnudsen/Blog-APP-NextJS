import slugify from "slugify";


export default async function createPost(title:string, description:string, isDraft:boolean, userId:string) {
    const res=await fetch("/api/post/create",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:title,
            description:description,
            slug:slugify(title),
            published: isDraft,
            userId:userId,
        })
    })
    return res
};
import slugify from "slugify";

export async function updatePost(title:string,description:string,isDraft:boolean,userId:string,postId:string){
    const res=await fetch("/api/post/edit",{
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
            postId:postId,
    })
    })
    return res

}
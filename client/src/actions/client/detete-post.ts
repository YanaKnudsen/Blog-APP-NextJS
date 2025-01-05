import slugify from "slugify";


export default async function deletePost(slug:string,userId:string) {
    const res=await fetch("/api/post/delete",{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            slug:slug,
            userId:userId
        })
    })
    console.log("post deleted")
    return res
};

export default async function createComment(content:string, postId:string, userId:string) {
    const res=await fetch("/api/comment/create",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            content:content,
            userId:userId,
            postId:postId,
        })
    })
    return res
};




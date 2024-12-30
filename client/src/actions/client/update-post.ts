import slugify from "slugify";

export async function updatePost(title:string,description:string,isDraft:boolean,userId:string,postId:string){
    try{
    const res=await fetch(process.env.URL+"/api/post/edit",{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:title,
            description:description,
            slug:slugify(title),
            published: isDraft,
            userId:userId,
            id:postId,
    })
    })
    }
    catch (err) {
        console.log(err);
    }

}
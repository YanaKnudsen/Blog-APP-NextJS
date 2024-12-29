import {z} from "zod";
import slugify from "slugify";
import {useDraftStore} from "@/store/zustand";

export async function submitPost(values:z.infer<typeof schema>,isDraft:boolean){

    const res=await fetch(process.env.URL+"/api/post/edit",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(post_id?{
            title:values.title,
            description:values.description,
            slug:slugify(values.title),
            published: isDraft,
            userId:id,
            id:post_id,
        }:{
            title:values.title,
            description:values.description,
            slug:slugify(values.title),
            published: isDraft,
            userId:id,
        })
    })
    if (res.ok) {
        console.log(res);
        reset();
        useDraftStore.setState({id:""})

        route.push("/profile");


    }else{
        console.error("failed")
        console.log(res);
        //show error message here from res
    }

}
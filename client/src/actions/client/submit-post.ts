"use server"
import {z} from "zod";
import slugify from "slugify";
import {useDraftStore} from "@/store/zustand";


export default async function submitPost(title:string,description:string,isDraft:boolean,userId:string) {
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

    if(res.ok){
        const data=await res.json();
        return data;
    }
    else{

    }
};
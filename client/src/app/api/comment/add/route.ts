import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";
import slugify from "slugify";

//create new post
export async function POST(req: Request) {
    try {
        const body=await req.json();
        console.log("data",body)
        const newPost=await prisma.comment.create({
            data: body,
        });
        console.log(newPost);

        return new NextResponse(JSON.stringify(newPost,{status:200}));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({message:"Unexpected error"},{status:500}));

    }
}
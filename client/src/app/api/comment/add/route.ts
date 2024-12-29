import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

//edit new post
export async function POST(req: Request) {
    try {
        const body=await req.json();
        console.log("data",body)
        const newPost=await prisma.comment.create({
            data: body,
        });
        console.log(newPost);

       // return new NextResponse(JSON.stringify(newPost,{status:200}));
        return NextResponse.json(newPost, { status:200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}
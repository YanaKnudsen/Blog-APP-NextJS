import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

//edit new post
export async function POST(req: Request) {
    try {
        const body=await req.json();
        const newPost=await prisma.comment.create({
            data: body,
        });
        return NextResponse.json(newPost, { status:200 })
    } catch{
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}
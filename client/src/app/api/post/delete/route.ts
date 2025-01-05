import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

export async function DELETE(req: Request) {
    try {
        const body=await req.json();
            const responsePost = await prisma.post.delete({
                where: {slug:body.slug,userId:body.userId},
            });
            return NextResponse.json(responsePost, { status:200 })

    } catch {
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}
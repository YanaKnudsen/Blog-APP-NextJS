import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

//show one post
export async function GET(req: Request) {
    const url = new URL(req.url); // Parse the URL from the request
    const slug = url.pathname.split("/").pop();
    try {
        const post = await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true },
        });


        return NextResponse.json(post, { status:200 })
    } catch{
        return NextResponse.json({message:"Unexpected error"}, { status:500 });

    }
}

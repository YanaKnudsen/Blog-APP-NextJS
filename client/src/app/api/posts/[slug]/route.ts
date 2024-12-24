import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";

//show one post
export async function GET(req: Request) {
    const url = new URL(req.url); // Parse the URL from the request
    const slug = url.pathname.split("/").pop();
    console.log("url",typeof slug)
    try {
        const post = await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true },
        });


        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );

    }
}

import {NextResponse} from "next/server";
import {prisma} from "@/utils/db";



export async function GET(req: Request) {
    const {searchParams}=new URL(req.url);
    const page:string|null=searchParams.get("page")
    const take:string|null=searchParams.get("take")
    const userId:string|null=searchParams.get("userId")

    const pageNumber:number = page ? Number(page) : 1; // Default to 1 if null
    const takeNumber:number  = take ? Number(take) : 4; // Default to 10 if null
    const query:object={
        take: takeNumber,
        skip: takeNumber * (pageNumber - 1),
        //include:{user:true},
        where: userId
            ? { userId: userId } // Filter by userId if provided
            : { published: true },
        orderBy: { updatedAt: 'desc' },
        select: {
            id:true,
            title: true,
            slug: true,
            user:true,
            published:true,
            createdAt:true,
            updatedAt:true,
        },

    }
    try {
        const [posts,count]=await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({
                where: userId
                    ? { userId: userId } // Filter by userId if provided
                    : { published: true },
            }),
        ])

        return NextResponse.json({posts,count}, { status:200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"Unexpected error"}, { status:500 })
    }
}
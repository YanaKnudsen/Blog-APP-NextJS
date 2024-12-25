"use client"
import {Post} from "@/@types/post";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export default function PostCard({post}) {
    const router=useRouter();



    /*

    const handlePageChange = (page: number) => {
        console.log("current page",currentPage)
        setCurrentPage(page);
        getData(page);
        console.log("new page",page)

    };
*/

    return (
            <Card key={post.slug} className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">

                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                </CardHeader>
                <CardFooter className="px-4 py-2 text-sm flex-col items-start">
                    <Button onClick={()=>{
                        router.push(`/posts/${post.slug}`);
                    }}>read</Button>
                    <div className="flex flex-row gap-2">
                        <p className="mt-2">{post.user.name}</p>
                        <p className="mt-2">{post.createdAt.split("T")[0]}</p>
                    </div>
                </CardFooter>
                {/*

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} tabIndex={currentPage <= 1 ? -1 : undefined}
                                            className={
                                                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                                            }/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} tabIndex={currentPage <= 1 ? -1 : undefined}
                                        className={
                                            currentPage >= pagesCount ? "pointer-events-none opacity-50" : undefined
                                        }/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>        */}
            </Card>



    );
}
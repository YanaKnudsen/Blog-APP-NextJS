import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import code from "../../assets/Code.png"
import Image from 'next/image'

export default function Latest() {
    return (
        <div className="flex flex-col basis-2/3  h-full border-r items-center ">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
                Discover our posts
            </h2>
            <div className="min-w-full flex flex-col gap-5 items-center ">
                <Card className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-yellow-300 h-56 w-full">
                        <Image
                            src={code}
                            className="object-cover w-full h-full"
                            alt="Picture of the author"
                        />
                    </div>
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg font-semibold">Title</CardTitle>
                        <CardDescription className="text-sm ">Description goes here</CardDescription>
                    </CardHeader>
                    <CardFooter className="px-4 py-2 text-sm">
                        <p>Author and Date</p>
                    </CardFooter>
                </Card>


            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
}
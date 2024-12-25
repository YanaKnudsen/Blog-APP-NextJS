"use client"
import {Pagination,PaginationContent,PaginationItem,PaginationPrevious,PaginationLink,PaginationEllipsis,PaginationNext} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function PostsPagination({currentPage, hasPrev, hasNext,pagesCount}) {
    const router=useRouter();
    return (
        <div>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => router.push(`?page=${currentPage - 1}`)} tabIndex={hasPrev  ? -1 : undefined}
                                        className={
                                            !hasPrev  ? "pointer-events-none opacity-50" : undefined
                                        }/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => router.push(`?page=${currentPage + 1}`)} tabIndex={hasNext? -1 : undefined}
                                    className={
                                        !hasNext? "pointer-events-none opacity-50" : undefined
                                    }/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>

        </div>

    );
}
"use client"
import {Pagination,PaginationContent,PaginationItem,PaginationPrevious,PaginationLink,PaginationEllipsis,PaginationNext} from "@/components/ui/pagination";

export default function PaginationComponent({currentPage,take,count}:{currentPage:number, take:number,count:number}) {

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={`?page=${currentPage - 1}`}
                                            className={
                                                currentPage<=1  ? "pointer-events-none opacity-50" : undefined
                                            }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href={`?page=${currentPage}`}>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href={`?page=${currentPage + 1}`} className={
                            (take*currentPage>=count  )? "pointer-events-none opacity-50" : undefined
                        }/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>

    );
}
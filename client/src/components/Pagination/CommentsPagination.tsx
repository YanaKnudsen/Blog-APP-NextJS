"use client"
import {Pagination,PaginationContent,PaginationItem,PaginationPrevious,PaginationLink,PaginationEllipsis,PaginationNext} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";

export default function CommentsPagination({currentPage,setCurrentPage,take,count}:{currentPage:number,setCurrentPage:Function, take:number,count:number}) {
    const router=useRouter();



    function showNext(){
        setCurrentPage((prev)=>prev+1);

    }
    function showPrev(){
        setCurrentPage((prev)=>prev-1);
    }


    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={showPrev}
                                            className={
                                                currentPage<=1  ? "pointer-events-none opacity-50" : undefined
                                            }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" onClick={showNext}  className={
                            (take*currentPage>=count  )? "pointer-events-none opacity-50" : undefined
                        }/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>

    );
}
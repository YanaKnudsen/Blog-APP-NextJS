import fetchComments from "@/server/actions/fetch-comments";
import {useQuery} from "@tanstack/react-query";

export function useGetComments(page,id,slug){
    return useQuery({
        queryFn:async ()=>fetchComments(page,id,slug),
        queryKey:["comments"]
    })
}
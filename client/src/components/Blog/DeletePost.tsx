"use client"
import {useState, useTransition} from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import deletePost from "@/actions/client/detete-post";
import {useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import fetchPosts from "@/actions/client/fetch-posts";



export function DeletePost({slug,userId}:{slug:string,userId:string,currentPage:string}) {
    const queryClient = useQueryClient();
    const {mutateAsync: deletePostMutation} = useMutation({
        mutationFn: () => fetchPosts(),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });
    const [open, setOpen] = useState(false);
    const router=useRouter();
    async function onDelete(){
            await deletePost(slug, userId);
            await deletePostMutation();
            setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete post</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this post? All data will be permanently lost.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="destructive" onClick={onDelete}>Delete anyway</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
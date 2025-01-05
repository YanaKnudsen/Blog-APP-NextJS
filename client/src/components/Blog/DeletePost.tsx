"use client"
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
import {Post} from "@/@types/post";
import deletePost from "@/actions/client/detete-post";
import {useRouter} from "next/navigation";


export function DeletePost({post}:{post:Post}) {
    const router=useRouter();
    function onDelete(){
        deletePost(post.slug, post.userId);
        router.refresh();
    }
    return (
        <Dialog>
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
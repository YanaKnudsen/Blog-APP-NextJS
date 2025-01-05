"use client"
import {useState} from "react";
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
import {useMutation, useQueryClient} from "@tanstack/react-query"
import fetchPosts from "@/actions/client/fetch-posts";
import {useTranslations} from "next-intl";



export function DeletePost({slug,userId}:{slug:string,userId:string}) {
    const queryClient = useQueryClient();
    const {mutateAsync: deletePostMutation} = useMutation({
        mutationFn: () => fetchPosts(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]});
        }
    });
    const [open, setOpen] = useState(false);
    async function onDelete(){
            await deletePost(slug, userId);
            await deletePostMutation();
            setOpen(false);
    }
    const t = useTranslations('EditPost');
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">{t('delete')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('deletePost')}</DialogTitle>
                    <DialogDescription>
                        {t('deleteWarning')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={onDelete}>{t('deleteAnyway')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
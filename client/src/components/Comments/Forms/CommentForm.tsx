"use client"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useUserStore} from "@/store/zustand";
import { Textarea } from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import createComment from "@/actions/client/create-comment";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import fetchComments from "@/actions/client/fetch-comments";

const schema = z.object({
    comment: z
        .string()
        .trim()
        .min(5, "Comment must be at least 1 character long")
        .refine((val) => val.replace(/\s/g, '').length >= 1, {
            message: "Comment must have at least 1 non-empty character",
        })
        .refine(val => val !== '', {
            message: "Comment cannot be empty", // Ensure the description is not empty after trimming
        }),

});

export default function CommentForm({postId,currentPage}: { postId: string,currentPage:string }) {
    type CommentSchema = z.infer<typeof schema>;
    const {register, handleSubmit, reset,setError,
        formState: { errors }, }
    = useForm<CommentSchema>({
        resolver: zodResolver(schema),
    })
    const userId = useUserStore((state) => state.id);
    const queryClient = useQueryClient();
    const {mutateAsync: createCommentMutation} = useMutation({
        mutationFn: () => fetchComments(currentPage,postId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments"]});
        }
    });

    async function submitComment(values:z.infer<typeof schema>){
        const res=await createComment(values.comment,postId,userId)
        if (res.ok) {
            await createCommentMutation();
            reset();
        }else{
            const error=await res.json();
            setError("comment", { type: "custom", message: error.message })
        }

    }

    return (
            <form onSubmit={handleSubmit(submitComment)}  className="flex flex-col gap-5 mt-10 mb-10">
                <div className="">
                    <div className="  w-full overflow-auto p-1">


                        <div className="flex flex-col gap-2">

                            <div className="grid gap-2">
                                <Textarea placeholder="Add your comment..."
                                          id="comment"
                                          required
                                          className="min-h-[100px] max-h-[150px]"
                                          {...register("comment")}
                                />
                                {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
                            </div>



                        </div>

                    </div>

                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Button  type="submit">Submit</Button>

                </div>
            </form>

    );
}
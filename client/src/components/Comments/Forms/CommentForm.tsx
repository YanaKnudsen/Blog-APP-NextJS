"use client"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useUserStore} from "@/store/zustand";
import { Textarea } from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Post} from "@/@types/post";

const schema = z.object({
    comment: z
        .string()
        .min(1, "Title must be at least 5 characters long")


});

export default function CommentForm({post}: { post: Post }) {
    type CommentSchema = z.infer<typeof schema>;
    const {register, handleSubmit, reset,
        formState: { errors }, }
    = useForm<CommentSchema>({
        resolver: zodResolver(schema),
    })
    const id = useUserStore((state) => state.id);

    async function submitComment(values:z.infer<typeof schema>){
        const res=await fetch("/api/comment/add",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                content:values.comment,
                userId:id,
                postId:post.id,
            })
        })
        if (res.ok) {
            console.log("saved")
            reset();


        }else{
            console.error("failed")
            //show error message here from res
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
                                    //onChangeCapture={handleMarkdownChange}
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
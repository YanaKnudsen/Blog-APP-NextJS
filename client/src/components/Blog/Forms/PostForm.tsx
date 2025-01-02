"use client"
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useUserStore} from "@/store/zustand";
import Preview from "@/components/Blog/Preview";
import PostEditingFields from "@/components/Blog/Forms/PostEditingFields";
import Markdownupload from "@/components/Blog/Markdownupload";
import createPost from "@/actions/client/create-post";
import {updatePost} from "@/actions/client/update-post";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {useTranslations} from 'next-intl';
import {Post} from "@/@types/post";

const schema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(20, "Post text must be at least 20 characters long"),
});

export default function PostForm({post,setEditMode,editMode=false}:{post?:Post,setEditMode?:Dispatch<SetStateAction<boolean>>,editMode?:boolean}) {



    type Schema = z.infer<typeof schema>

    const [isMatter, setIsMatter] = useState<boolean>(false);
    const [isPreview, setIsPreview ]= useState<boolean>(false);
    const t = useTranslations('EditPost');

    useEffect(() => {
        if(post){
            setValue("title",post.title,{ shouldValidate: true });
            setValue("description",post.description,{ shouldValidate: true })
        }

    },[]);


    const { register, setValue,getValues ,reset,setError,
        formState: { errors,isValid }, } = useForm<Schema>({ mode: 'onChange' ,
        resolver: zodResolver(schema),
    })


    const userId = useUserStore((state) => state.id);
    const router=useRouter();

    async function onSubmit(values:z.infer<typeof schema>,isDraft:boolean){
        if (post?.id){
            const res:Response=await updatePost(values.title,values.description,isDraft,userId,post.id)
            if(res.ok){
                reset();
                router.push("/profile")
                if(editMode && setEditMode){
                    setEditMode(false)
                }
            }else{
                const error=await res.json();
                setError("title", { type: "custom", message: error.message })
            }

        }else{
            const res:Response=await createPost(values.title,values.description,isDraft,userId)
            if(res.ok){
                reset();
                router.push("/profile")
                if(editMode && setEditMode){
                    setEditMode(false)
                }
            }else{
                const error=await res.json();
                setError("title", { type: "custom", message: error.message })
            }
        }

    }


    function onPublish() {
        const values = getValues();
        onSubmit(values, true);
    }

    function onDraft() {
        const values = getValues();
        onSubmit(values, false);
    }



    return (
        <div className="w-full min-w-screen flex p-8 pb-20 sm:p-20 flex flex-col p">
            {editMode? (<div>
                <Button variant="secondary" onClick={()=>{
                    if(editMode && setEditMode) {
                        setEditMode(false)
                    }
                }}>
                <FontAwesomeIcon icon={faArrowLeft} />
                    {t('back')}
            </Button>
            </div>):null}
            <form  className="flex flex-col gap-5 w-full">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {post? t('edit'):t('create')}
                </h1>

                <div className="">
                    <div className="flex flex-row justify-between items-center mb-2">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {isPreview?t('preview'):""}
                        </h3>
                        <div className="flex flex-row gap-2 justify-end items-center ">

                            <Markdownupload setValue={setValue} setIsMatter={setIsMatter} />
                            <Button className="" type="button" onClick={()=>{setIsPreview(!isPreview)}}>{isPreview?t('edit'):t('preview')}</Button>
                        </div>
                    </div>
                    <div className="  w-full overflow-auto p-1">
                        {isPreview ?(
                                <Preview isMatter={isMatter} getValues={getValues}/>):
                            (<PostEditingFields register={register} setValue={setValue} setIsMatter={setIsMatter}  errors={errors} />)}

                    </div>

                </div>
                <div className="flex flex-row justify-end gap-2">
                    <Button  type="button" name="draft" disabled={!isValid} onClick={onDraft}>{t('saveDraft')}</Button>
                    <Button  type="button" name="publish" disabled={!isValid} onClick={onPublish}>{t('publish')}</Button>

                </div>
            </form>

        </div>
    );
}

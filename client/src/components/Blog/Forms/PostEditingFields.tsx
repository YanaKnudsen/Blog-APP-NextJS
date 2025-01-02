"use client"
import {Dispatch, SetStateAction} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {markdownToHTML} from "@/helpers";
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {useTranslations} from "next-intl";



export default function PostEditingFields({register,setValue,setIsMatter,errors}:{register:UseFormRegister<{ title: string; description: string; }>,setValue:UseFormSetValue<{ title: string; description: string; }>,setIsMatter:Dispatch<SetStateAction<boolean>>,errors:FieldErrors<{ title: string; description: string; }>}) {


    const handleMarkdownChange = async (input:string) => {
        setValue("description",input,{ shouldValidate: true })
        const { title: matterTitle } = await markdownToHTML(input);
        if(matterTitle){
            setValue("title",matterTitle, { shouldValidate: true });
            setIsMatter(true);
        }else{
            setIsMatter(false);
        }

    };

    const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement >) => {
        const value = event.target.value;
        setValue("title", value, { shouldValidate: true });
    }
    const t = useTranslations('EditPost');


    return (
        <div className="flex flex-col gap-2">
            <div className="grid gap-2">
                <Label htmlFor="name">{t('title')}</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder={t('titlePlaceholder')}
                    onChangeCapture={handleTitleChange}
                    {...register("title")}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">{t('content')}</Label>
                <Textarea placeholder={t('contentPlaceholder')}
                          id="description"
                          required
                          onChangeCapture={(e:React.ChangeEvent<HTMLTextAreaElement>)=> {
                              handleMarkdownChange(e.target.value);
                          }}
                          className="min-h-[350px] max-h-[350px]"
                          {...register("description")}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>



        </div>
    );
}
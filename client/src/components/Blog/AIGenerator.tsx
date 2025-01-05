"use client"
import { Button } from "@/components/ui/button"
import {useTranslations} from "next-intl";
import createAI from "@/actions/client/create-ai";
import {UseFormSetValue} from "react-hook-form";



export function AIGenerator({setValue,getValues}:{setValue:UseFormSetValue<{ title: string; description: string; }>,getValues: (payload?: string | string[]) => string}) {

    async function onGenerate(){
        const userPrompt=getValues("description");
        const res = await createAI(userPrompt);
        const {AIDescription,AITitle} = await res.json();
        setValue("title", AITitle, { shouldValidate: true });
        setValue("description", AIDescription, { shouldValidate: true });
    }
    const t = useTranslations('EditPost');
    return (
        <Button variant="secondary" type="button" onClick={onGenerate}>{t("generate")}</Button>
    )
}
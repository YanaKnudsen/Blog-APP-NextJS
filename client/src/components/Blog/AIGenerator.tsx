"use client"
import { Button } from "@/components/ui/button"
import {useTranslations} from "next-intl";
import createAI from "@/actions/client/create-ai";
import {UseFormSetValue} from "react-hook-form";
import {useState} from "react";



export function AIGenerator({setValue,getValues}:{setValue:UseFormSetValue<{ title: string; description: string; }>,getValues: (payload?: string | string[]) => string}) {
    const   [isLoading,setIsLoading]  =useState<boolean>(false);
    async function onGenerate(){
        setIsLoading(true);
        const userPrompt=getValues("description");
        const res = await createAI(userPrompt);
        const {AIDescription,AITitle} = await res.json();
        setValue("title", AITitle, { shouldValidate: true });
        setValue("description", AIDescription, { shouldValidate: true });
        setIsLoading(false);
    }
    const t = useTranslations('EditPost');
    return (
        <Button variant="secondary" type="button" onClick={onGenerate}>{isLoading?t("loading"):t("generate")}</Button>
    )
}
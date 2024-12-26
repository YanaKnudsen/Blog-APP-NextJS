"use client"
import {TypographyH1} from "@/components/ui/typography/typography";


export default function PostTitle({title = ""}:{title:string}) {


    return (
        <div>
            {title && <TypographyH1>{title}</TypographyH1>}

        </div>
    );
}
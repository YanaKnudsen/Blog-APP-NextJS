//convert markdown to html
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

export async function markdownToHTML(markdown){
        const matterResult = matter(markdown);
        if(matterResult.data.title){
            const matterTitle  = matterResult.data.title;
            // Convert Markdown to HTML
            const processedContent = await remark().use(html).process(matterResult.content);
            const mark=processedContent.toString();
            return mark
        }else{
            const processedContent = await remark().use(html).process(markdown);
            const mark=processedContent.toString();
            return mark
        }
}
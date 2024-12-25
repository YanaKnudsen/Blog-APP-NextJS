//convert markdown to html
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

export async function markdownToHTML(markdown: string) {
    const matterResult = matter(markdown);
    const title = matterResult.data.title || null; // Extract title if available
    const processedContent = await remark().use(html).process(matterResult.content || markdown);
    const htmlContent = processedContent.toString();

    return {
        title,
        html: htmlContent,
    };
}
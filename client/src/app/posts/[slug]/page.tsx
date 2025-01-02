import fetchData from "@/actions/server/fetch-post";
import PostInfo from "@/components/Blog/PostInfo";
import {markdownToHTML} from "@/helpers";
import Comment from "@/components/Comments/Comment";





export default async function PostPage(props: { params: Promise<{ slug: string ,page:string  }> }) {
    const {  params} = props;
    const resolvedSearchParams = await params;
    const page =  parseInt(resolvedSearchParams.page??"1") || 1;
    const {slug}=resolvedSearchParams


    const postData= await fetchData(slug);
    const { title: matterTitle, html: markdown } = await markdownToHTML(postData.description);
    const title = matterTitle? "" : postData.title;




    return (
            <div className="p-4">
                <PostInfo post={postData} markdown={markdown} title={title}/>
                <Comment page={page} post={postData}/>
            </div>

    );
}
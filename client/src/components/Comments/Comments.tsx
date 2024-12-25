
import fetchComments from "@/server/actions/fetch-comments";
import {Comment} from "@/@types/comment";
import CommentCard from "@/components/Comments/CommentCard";





export default async function Comments({post}) {
    console.log(1,post.id,post.slug)
    const commentsData:{comments:Comment[],count:number}= await fetchComments(1,post.id,post.slug);
    console.log(commentsData);

    /*

    //prefetchcomments
      const { isPending, error, data ,fetchStatus} = useQuery({
          queryKey: ['comments'],
          queryFn: fetchComments()
      })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


    async function getComments(page:number,id:string,slug:string){
                const res=await fetchComments(page,id,slug);
                setComments(res.comments);
    }

*/
    return (
        commentsData.comments?.map((comment)=>(
            <div key={comment.id} ><CommentCard comment={comment}/> </div>
        ))
    );
}
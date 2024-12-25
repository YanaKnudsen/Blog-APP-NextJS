export default async function fetchComments(page:number,id:string,slug:string){
    console.log("fetchig comments")
    const res=await fetch(process.env.URL +`/api/comment/get?id=${id}&slug=${slug}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        },
    })
    if(res.ok){
        console.log( res);
        const { comments, count } = await res.json();
        return ({comments,  count});
    }
}

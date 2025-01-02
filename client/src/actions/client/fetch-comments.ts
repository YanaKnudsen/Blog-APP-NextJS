export default async function fetchComments(page:number,id:string,slug:string){
    const res=await fetch(`/api/comment/list?page=${page}&id=${id}&slug=${slug}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        },
    })
    if(res.ok){
        const { comments, count } = await res.json();
        return ({comments,  count});
    }
}

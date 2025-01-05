export default async function fetchComments(page:number=1,id:string){
    const res=await fetch(`/api/comment/list?page=${page}&id=${id}`,{
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

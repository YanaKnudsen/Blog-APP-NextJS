export default async function fetchComments(page:number,id:string,slug:string){
    const res=await fetch(`http://localhost:3000/api/comment/get?page=${page}&id=${id}&slug=${slug}`,{
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

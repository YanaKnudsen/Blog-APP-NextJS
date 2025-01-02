export default async function fetchPost (slug:string) {
    const res = await fetch(`/api/post/${slug}`, {
        cache: "no-store",
    });

    if(res.ok){
        const data=await res.json();
        return data;

    }
};
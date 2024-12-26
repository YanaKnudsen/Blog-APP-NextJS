export default async function fetchData (slug:string) {
    const res = await fetch(process.env.URL +`/api/posts/${slug}`, {
        cache: "no-store",
    });

    if(res.ok){
        const data=await res.json();
        return data;

    }
};
"use client"
import Latest from "@/components/Posts/Latest";
import Top from "@/components/Posts/Top";


export default function Home() {

  return (
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
        <main className="flex flex-row h-screen">
            <Latest/>
        </main>

    </div>
  );
}

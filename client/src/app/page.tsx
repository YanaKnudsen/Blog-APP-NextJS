"use client"
import Latest from "@/components/Posts/Latest";
import Top from "@/components/Posts/Top";
import {localStore} from "@/store/zustand";

export default function Home() {
    const user=localStore((state)=>state.user)
  return (
    <div className="w-full min-w-screen flex min-h-screen p-8 pb-20 sm:p-20 flex-col">
        <p>{user.FullName}</p>
        <main className="flex flex-row h-screen">
            <Latest/>
            <Top/>
        </main>

    </div>
  );
}

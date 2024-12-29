"use client"
import Link from "next/link";
import MainNav from "@/components/Navbar/MainNav";
import MobileNav from "@/components/Navbar/MobileNav";
import {useUserStore} from "@/store/zustand";
export default function Navbar() {
    const name = useUserStore((state) => state.name)
    return (
        <nav className="flex flex-row justify-between items-center px-5 sticky top-0 border-b h-14 bg-background">
           <div className="flex flex-row gap-2 items-center">
            <Link href="/" className=" ">DevByte</Link>
               {name && <div className="border rounded-full h-8 w-8 flex justify-center items-center">{name.split(" ")[0][0]}</div>}
           </div>
            <MainNav/>
            <MobileNav/>


        </nav>
    );
}

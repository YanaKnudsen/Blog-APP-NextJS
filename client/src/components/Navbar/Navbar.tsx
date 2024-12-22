import Link from "next/link";
import MainNav from "@/components/Navbar/MainNav";
import MobileNav from "@/components/Navbar/MobileNav";
import {ModeToggle} from "@/components/ModeToggle";
export default function Navbar() {
    return (
        <nav className="flex flex-row justify-between items-center px-5 sticky top-0 border-b h-14 bg-background">
            <Link href="/" className=" ">DevByte</Link>
            <MainNav/>
            <MobileNav/>


        </nav>
    );
}

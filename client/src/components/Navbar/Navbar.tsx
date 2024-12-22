import Link from "next/link";
import MainNav from "@/components/Navbar/MainNav";
import MobileNav from "@/components/Navbar/MobileNav";
export default function Navbar() {
    return (
        <nav className="flex flex-row justify-between items-center px-5 bg-fuchsia-100 sticky top-0 border-b h-14">
            {/*<div className="flex flex-row gap-5">
                <Link href="/">DevByte</Link>
                {/*<div> links here maybe</div>
            </div>
                <div className="flex flex-row gap-5">
                <div>theme toggle</div>
                <Link href="">Log in</Link>
                </div>
                */}
            {/*Desktop*/}
            <MainNav/>

            {/*Mobile*/}
            <MobileNav/>

            <h1 className="flex items-center justify-end flex-1">
                <Link href="">Icons</Link>
            </h1>

        </nav>
    );
}

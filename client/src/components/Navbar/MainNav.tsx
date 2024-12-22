import Link from "next/link";
export default function MainNav() {
    return (
        <div className=" hidden md:flex flex-row justify-between items-center">
            <Link href="/" className=" ">DevByte</Link>
            <nav className="flex items-center gap-4 lg:gap-5 ml-8">
                <Link href="">About</Link>
                <Link href="">Contact</Link>
            </nav>
        </div>
    );
}
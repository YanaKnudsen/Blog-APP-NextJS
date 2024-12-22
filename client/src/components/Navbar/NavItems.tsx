import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";
import AuthLink from "@/components/Navbar/AuthLink";

export default function NavItems() {
    return (
            <div className="flex flex-col md:flex-row gap-4 lg:gap-5 ml-8 items-center">
                <ModeToggle/>
                <AuthLink/>
            </div>
    );
}

import {ModeToggle} from "@/components/ui/ModeToggle";
import AuthLink from "@/components/Navbar/AuthLink";

export default function NavItems() {
    return (
        <div className="flex flex-col md:flex-row gap-4 lg:gap-5 ml-8 items-center">
            <AuthLink/>
            <ModeToggle/>
        </div>
    );
}

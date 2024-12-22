import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NavItems from "@/components/Navbar/NavItems";

export default function MobileNav() {
    return (
            <div className="md:hidden ml-auto">
                <Sheet>
                    <SheetTrigger><FontAwesomeIcon className="w-6 h-6" icon={faBars}/></SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader className="hidden">
                            <SheetTitle></SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <NavItems/>
                    </SheetContent>
                </Sheet>
            </div>
    );
}
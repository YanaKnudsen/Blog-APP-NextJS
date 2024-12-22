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

export default function MobileNav() {
    return (
        <div className="md:hidden">
            {/* <FontAwesomeIcon icon={faPenNib} />*/}
            <Sheet>
                <SheetTrigger><FontAwesomeIcon className="w-6 h-6" icon={faBars}/></SheetTrigger>
                <SheetContent side="left">
                 <SheetHeader className="hidden">
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                    <Link href="/" className=" ">DevByte</Link>
                    <nav className="flex items-center gap-4 lg:gap-5 ml-8">
                        <Link href="">About</Link>
                        <Link href="">Contact</Link>
                        <Link href="">Log in</Link>
                    </nav>

                </SheetContent>
            </Sheet>
        </div>
    );
}
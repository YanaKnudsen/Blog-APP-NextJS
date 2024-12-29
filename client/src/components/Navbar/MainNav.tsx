import NavItems from "@/components/Navbar/NavItems";
export default function MainNav() {
    return (
        <div className="hidden md:flex flex-row justify-between items-center">
            <NavItems/>
        </div>
    );
}
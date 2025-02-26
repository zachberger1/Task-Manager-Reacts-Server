import Image from "next/image";
import NavButton from "./navbutton";

export default function Header() {
    return (
        <div className="bg-[#1f1f1f] left-0 right-0 top-0 h-20 flex items-center px-4">
            <NavButton href="/eventPlanner.tsx">Event Planner</NavButton>
            <NavButton href="/friends">Friends</NavButton>
            <NavButton href="/websiteList">Website List</NavButton>
            <Image src="/zachbergerlogo.png" alt="Logo" width={100} height={100} className="h-16 w-16 ml-auto" />
        </div>
    );
}

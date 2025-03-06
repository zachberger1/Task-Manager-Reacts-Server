import Image from 'next/image';
import NavButton from './navbutton';
import { ThemeToggle } from './components/ui/theme-toggle';

export default function Header() {
    return (
        <div className="bg-[#b7b6b6]  left-0 right-0 top-0 h-20 flex items-center px-4 w-full dark:bg-[#1f1f1f]">
            <NavButton href="/eventPlanner">Event Planner</NavButton>
            <NavButton href="/friends">Friends</NavButton>
            <NavButton href="/websiteList">Website List</NavButton>
            <ThemeToggle />
            <Image src="/zachbergerlogo.png" alt="Logo" width={70} height={70} className="h-27 w-27 ml-auto " />
            
        </div>
    );
}
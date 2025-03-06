'use client';

import Link from 'next/link';

interface NavButtonProps {
    href: string;
    children: React.ReactNode;
}

export default function NavButton({ href, children }: NavButtonProps) {
    return (
        <Link
            href={href}
            className="bg-zinc-300 hover:bg-zinc-500 text-black mx-1 px-4 py-2 dark:text-white dark:bg-[#333333] dark:hover:bg-[#555555]"
        >
            {children}
        </Link>
    );
}
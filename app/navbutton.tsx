'use client';

import { ReactNode } from 'react';

interface NavButtonProps {
    children: ReactNode;
    href: string;
}

export default function NavButton({ children }: NavButtonProps) {
    return (
        <div>
            <a
                href="#"
                className="bg-[#333333] text-white mx-1 px-4 py-2 hover:bg-[#555555]"
            >
                {children}
            </a>
        </div>
    )
}

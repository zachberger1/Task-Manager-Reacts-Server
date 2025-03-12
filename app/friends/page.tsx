'use client';

import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '../header';

export default function ContactDrawer() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    async function handleSubmit () {
        await fetch('/api/create-contact', {
            method: 'POST',
            body: JSON.stringify({ name, number: phone }),
            headers: { "Content-Type": "application/json" },
        });
        setName('');
        setPhone('');
    };

    return (
        <div>
            <Header />
            {/* Plus sign button to trigger the drawer */}
            <Drawer>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="bg-blue-600 p-2 hover:scale-110 transition-all rounded-lg text-white disabled:opacity-50 items-center flex m-5"
                    >
                        Add Contact   <Plus />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-[#b7b6b6] dark:bg-[#1f1f1f] p-4 rounded-t-lg">
                    <DrawerHeader>
                        <DrawerTitle>Add Contact</DrawerTitle>
                        <DrawerDescription>Enter contact details below.</DrawerDescription>
                    </DrawerHeader>

                    <div className="space-y-4 p-4">
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="dark:bg-gray-800 dark:text-white"
                        />
                        <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Save Contact</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

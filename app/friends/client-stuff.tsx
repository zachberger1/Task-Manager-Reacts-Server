"use client";

import { useState } from "react";
import { LoaderIcon, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouterRefresh } from "../use-router-refresh";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";



export default function ContactDrawer() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Manage drawer open state
    const [loading, setLoading] = useState(false);
    const refresh = useRouterRefresh();




    async function handleSubmit() {



        if (!name.trim() || !phone.trim()) {
            alert("Please enter both name and phone number");
            return;
        }
        setLoading(true);
        await fetch("/api/create-contact", {
            method: "POST",
            body: JSON.stringify({ name, number: phone }),
            headers: { "Content-Type": "application/json" },
        });

        setName("");
        setPhone("");
        setIsOpen(false); // Close the drawer after submitting

        setLoading(false);
        await refresh();
    }




    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="bg-blue-600 p-2 hover:scale-110 transition-all rounded-lg text-white disabled:opacity-50 items-center flex m-5 w-[135px] justify-between"
                        onClick={() => setIsOpen(true)}
                    >
                        Add Contact {loading ? <LoaderIcon className="animate-spin" /> : <Plus />}
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
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

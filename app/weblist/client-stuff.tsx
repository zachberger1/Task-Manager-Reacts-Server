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


export default function WebDrawer() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Manage drawer open state
    const [loading, setLoading] = useState(false);
    const refresh = useRouterRefresh();




    async function handleSubmit() {
            console.log(name, url);

        // const URL = url.startsWith("http") ? url : `https://${url}`; // Ensure URL starts with http or https
        // if (!name.trim() || !url.trim()) {
        //     alert("Please enter both name and phone number");
        //     return;
        // }
        setLoading(true);
        await fetch("/api/create-link", {
            method: "POST",
            body: JSON.stringify({ name, url }),
            headers: { "websites-Type": "application/json" },
        });

        setName("");
        setUrl("");
        setIsOpen(false); // Close the drawer after submitting

        setLoading(false);
        await refresh();
        console.log(name, url);

    }




    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="bg-blue-600 p-2 hover:scale-110 transition-all rounded-lg text-white disabled:opacity-50 items-center flex m-5 w-[110px] justify-between"
                        onClick={() => setIsOpen(true)}
                    >
                        Add Card {loading ? <LoaderIcon className="animate-spin" /> : <Plus className="size-6" />}
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-[#b7b6b6] dark:bg-[#1f1f1f] p-4 rounded-t-lg">
                    <DrawerHeader>
                        <DrawerTitle>Add Link-Card</DrawerTitle>
                        <DrawerDescription>Enter Link-Card details below.</DrawerDescription>
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
                            type="text"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Save Link-Card</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

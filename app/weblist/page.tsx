"use client";

import { Button } from "../components/ui/button";
import Header from "../header";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Friends() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Manage drawer open state

    function handleSubmit() {

        setName("");
        setPhone("");
        setIsOpen(false); // Close the drawer after submitting
        // await refresh();
    }
    return (
        <div>
            <Header />

            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="bg-blue-600 p-2 hover:scale-110 transition-all rounded-lg text-white disabled:opacity-50 items-center flex m-5 w-[100px] justify-between"
                        onClick={() => setIsOpen(true)}
                    >
                        Add link <Plus />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-[#b7b6b6] dark:bg-[#1f1f1f] p-4 rounded-t-lg">
                    <DrawerHeader>
                        <DrawerTitle>Add Link</DrawerTitle>
                        <DrawerDescription>Enter Website details below.</DrawerDescription>
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
                            type="URL"
                            placeholder="URL"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Save Website</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className="p-4 m-3 bg-[#b7b6b6] dark:bg-[#1f1f1f] w-60 rounded-lg border border-zinc-400">
                <div>
                    <a className="text-sm font-medium hover:underline" href="https://mattiscohenart.com/" target="_blank">
                        Mattis Chone Art
                    </a>
                    <p className="text-muted-foreground text-xs" >https://mattiscohenart.com/</p>
                </div>
            </div>


        </div>
    );
}



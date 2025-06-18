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


export default function EventDrawer() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const refresh = useRouterRefresh();

    async function handleSubmit() {
        if (!name.trim() || !location.trim() || !time.trim()) {
            alert("Please fill in all required fields.");
            return;
        }
        console.log("Submitting event:", { name, location, time, notes });

        setLoading(true);
        await fetch("/api/create-event", {
            method: "POST",
            body: JSON.stringify({ name, location, time, notes }),
            headers: { "Content-Type": "application/json" },

        });

        // Clear fields and close drawer
        setName("");
        setLocation("");
        setTime("");
        setNotes("");
        setIsOpen(false);
        setLoading(false);

        console.log("Submitting event:", { name, location, time, notes });
        await refresh();
    }

    return (
        <div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="bg-blue-600 p-2 hover:scale-110 transition-all rounded-lg text-white disabled:opacity-50 items-center flex m-5 w-[130px] justify-between"
                        onClick={() => setIsOpen(true)}
                    >
                        Add Event {loading ? <LoaderIcon className="animate-spin" /> : <Plus className="size-6" />}
                    </button>
                </DrawerTrigger>

                <DrawerContent className="bg-[#b7b6b6] dark:bg-[#1f1f1f] p-4 rounded-t-lg">
                    <DrawerHeader>
                        <DrawerTitle>Add Event</DrawerTitle>
                        <DrawerDescription>Enter event details below.</DrawerDescription>
                    </DrawerHeader>

                    <div className="flex flex-col md:flex-row gap-6 px-4">
                        <div className="space-y-4 flex-1">
                            <Input
                                type="text"
                                placeholder="Event Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white"
                            />
                            <Input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white"
                            />
                            <Input
                                type="datetime-local"
                                placeholder="Date & Time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="space-y-4 flex-1">
                            <textarea
                                name="Notes"
                                id="Notes"
                                rows={20}
                                placeholder="Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white h-[140px] resize-none rounded-lg p-4 w-[730px]"
                            ></textarea>

                        </div>
                    </div>

                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Save Event</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

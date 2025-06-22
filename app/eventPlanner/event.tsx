"use client";

import { format } from "date-fns";
import { EventsType } from "../Types/event-type";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouterRefresh } from "../use-router-refresh";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderIcon, ScrollIcon, Trash2 } from "lucide-react";

interface Props {
    data: EventsType;
}

export default function Event({ data }: Props) {
    const refresh = useRouterRefresh();
    const [loading, setLoading] = useState(false);

    const formattedTime = data.time
        ? format(new Date(data.time), "yyyy-MM-dd HH:mm")
        : "Invalid date";




    async function del() {
        setLoading(true);
        await fetch("/api/delete-event", {
            method: "DELETE",
            body: JSON.stringify({ id: data.id }),
            headers: { "Content-Type": "application/json" },
        });

        setLoading(false);
        await refresh();
    }
    return (

        <div className="bg-[#b7b6b6]bg-white dark:bg-[#1f1f1f] rounded-lg p-4 flex items-center justify-between mx-3 my-1">
            <div className="m-1">
                <h1 className="text-3xl text-gray-900 dark:text-gray-100">{data.name}</h1>
                <p className="text-2xl text-gray-700 dark:text-gray-400">{formattedTime}</p>
            </div>
            <div>
                
                <Dialog>
                    <DialogTrigger>
                        <Button size="icon" className="bg-sky-800 hover:bg-sky-900 text-white mr-2" >
                            <ScrollIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-3xl" >{data.name}</DialogTitle>
                            <DialogDescription  >
                                <p className="text-gray-700 dark:text-gray-400 text-2xl mt-2 ">
                                    Location: {data.location}
                                </p>
                                <p className="text-gray-700 dark:text-gray-400 mt-2 text-2xl ">
                                    Date: {formattedTime}
                                </p>
                                <p className="text-gray-700 dark:text-gray-400 text-2xl  ">
                                    {data.notes || "No description provided."}
                                </p>
                                
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Button variant="destructive" size="icon" className="mr-2" onClick={del} disabled={loading}>
                    {loading ? <LoaderIcon className="animate-spin" /> : <Trash2 className="w-7 h-7" />}
                </Button>
            </div>
        </div>

    );
}

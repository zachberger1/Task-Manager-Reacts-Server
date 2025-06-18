"use client";
import { LoaderIcon, Trash2 } from "lucide-react";

import { useRouterRefresh } from "../use-router-refresh";
import { useState } from "react";
import { EventsType } from "../Types/event-type";
interface Props {
    data: EventsType;
}

export default function Event({ data }: Props) {
    // const refresh = useRouterRefresh();
    // const [loading, setLoading] = useState(false);

    // async function del() {
    //     setLoading(true);
    //     await fetch("/api/delete-contact", {
    //         method: "DELETE",
    //         body: JSON.stringify({ id: data.id }),
    //         headers: { "Content-Type": "application/json" },
    //     });
        
    //     setLoading(false);
    //     await refresh();
    // }

    return (
        <div>
            <div className="bg-[#b7b6b6]bg-white dark:bg-[#1f1f1f] rounded-lg p-4 flex items-center justify-between mx-3 my-1">
                <div className="m-1">
                    <h1 className="text-3xl text-gray-900 dark:text-gray-100">{data.name}</h1>
                    <p className="text-2xl text-gray-700 dark:text-gray-400">{data.time}</p>
                </div>

            </div>
        </div>
    );
}
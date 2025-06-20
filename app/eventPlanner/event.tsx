"use client";

import { format } from "date-fns";
import { EventsType } from "../Types/event-type";

interface Props {
    data: EventsType;
}

export default function Event({ data }: Props) {
    // Convert string to Date and format it
    const formattedTime = data.time
        ? format(new Date(data.time), "yyyy-MM-dd HH:mm")
        : "Invalid date";

    return (
        <div>
            <div className="bg-[#b7b6b6] dark:bg-[#1f1f1f] rounded-lg p-4 flex items-center justify-between mx-3 my-1">
                <div className="m-1">
                    <h1 className="text-3xl text-gray-900 dark:text-gray-100">{data.name}</h1>
                    <p className="text-2xl text-gray-700 dark:text-gray-400">{formattedTime}</p>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { WebsitesType } from "../Types/websites-type";
import { useRouterRefresh } from "../use-router-refresh";
import { Trash2, LoaderIcon } from "lucide-react";

interface Props {
    data: WebsitesType;
}

export default function Website({ data }: Props) {
    const refresh = useRouterRefresh();
    const [loading, setLoading] = useState(false);

    async function del() {
        setLoading(true);
        await fetch("/api/delete-link", {
            method: "DELETE",
            body: JSON.stringify({ id: data.id }),
            headers: { "Website-Type": "application/json" },
        });

        setLoading(false);
        await refresh();
    }

    return (
        <div>
            <div className="bg-[#b7b6b6] dark:bg-[#1f1f1f] rounded-lg p-4 flex items-center justify-between mx-3 my-1 w-64 ">
                <div>
                    <a className="text-sm font-medium hover:underline cursor-pointer" href={data.url} target="_blank">
                        {data.name}
                    </a>
                    <h1 className="text-muted-foreground text-xs text-white " >{data.url}</h1>


                </div>
                <button
                    onClick={del}
                    className='mr-2'
                > {loading ? <LoaderIcon className="animate-spin" /> : <Trash2 className="size-6" />} </button>



            </div>
        </div>
    );
}
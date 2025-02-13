"use client"
import { LoaderIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTask() {
    const [task, setTask] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function call() {
        setLoading(true); // Move this inside the function
        await fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({ task }),
            headers: { "Content-Type": "application/json" },
        });
        setLoading(false);
        router.refresh();
    }

    return (
        <div className="ml-3 mb-4 bg-gray-900 p-10 w-fit mr-3 flex gap-3 mt-4 rounded-lg shadow-sm sticky">
            <input
                onChange={e => setTask(e.target.value)}
                type="text"
                value={task}
                className="border border-gray-300 p-1.5 rounded-xl font-sans text-black"
                placeholder="Enter a task..."
            />

            <button
                type="button"
                className="bg-blue-600 p-2 hover:scale-125 transition-all rounded-lg"
                onClick={call} // Call function on button click
                disabled={loading} // Disable button while loading
            >
                {loading ? <LoaderIcon className="animate-spin" /> : <Plus />}
            </button>
        </div>
    )
}


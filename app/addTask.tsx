"use client"
import { LoaderIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function AddTask() {
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function call() {

        if (!task.trim()) { // Check if task is empty or just spaces
            alert("Please enter a task before adding.");
            return;
        }

        setLoading(true);
        await fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({ task }),
            headers: { "Content-Type": "application/json" },
        });
        setLoading(false);
        setTask(""); // Clear input after adding the task
        router.refresh();
    }

    return (
        <div className="ml-1 mb-1 p-5 w-fit mr-3 flex gap-3 mt-1 rounded-lg shadow-sm sticky">
            <input
                onChange={e => setTask(e.target.value)}
                type="text"
                value={task}
                className="border p-1.5 rounded-xl font-sans text-black dark:text-white"
                placeholder="Enter a task..."
            />

            <button
                type="button"
                className="bg-blue-600 p-2 hover:scale-125 transition-all rounded-lg text-white disabled:opacity-50"
                onClick={call}
                disabled={loading}
            >
                {loading ? <LoaderIcon className="animate-spin" /> : <Plus />}
            </button>
        </div>
    );
}



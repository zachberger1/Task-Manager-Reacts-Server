"use client";


import { TaskType } from './Types/task-type';
import { formatDistanceToNow } from 'date-fns';
import { useRouterRefresh } from './use-router-refresh';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

interface Props { data: TaskType }

export default function Task(Props: Props) {
    const [loading, setLoading] = useState(false)

    const refresh = useRouterRefresh()
    async function call() {
        setLoading(true)    
        await fetch('/api/complete', {
            method: 'PUT',
            body: JSON.stringify({ id: Props.data.id, is_completed: !Props.data.is_completed }),
        })
        await refresh()
        setLoading(false)
    }
    return (
        <div className="bg-[#1f1f1f] rounded-lg p-2 flex items-center text-16 mx-3 my-1 ">
            {loading ? (
                <LoaderIcon className="animate-spin" />) : (
            
            <input type="checkbox" className='size-6 accent-green-600' onChange={call} checked={Props.data.is_completed} />)}
            <div className='flex flex-col gap-1 ml-3'>
                <p className='text-2xl font-bold' >{Props.data.task}</p>
                <p>{formatDistanceToNow(Props.data.created_at, { addSuffix: true })}</p>
            </div>

        </div>
    )
}
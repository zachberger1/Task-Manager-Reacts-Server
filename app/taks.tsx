"use client";


import { TaskType } from './Types/task-type';
import { formatDistanceToNow } from 'date-fns';
import { useRouterRefresh } from './use-router-refresh';
import { LoaderIcon, Trash2 } from 'lucide-react';
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

    async function del() {
        setLoading(true)
        await fetch('/api/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id: Props.data.id, is_completed: !Props.data.is_completed }),
        })
        await refresh()
        setLoading(false)
    }
    return (
        <div className="bg-[#b7b6b6] rounded-lg p-2 flex justify-between items-center text-16 mx-3 my-1 dark:bg-[#1f1f1f]">

            <div className='flex gap-3 items-center p-2 mx-3 my-1' >
                {loading ? (
                    <LoaderIcon className="animate-spin" />) : (
                    <input type="checkbox" className='size-6 accent-green-600' onChange={call} checked={Props.data.is_completed} />)}
                <div>
                    <p className='text-2xl font-bold' >{Props.data.task}</p>
                    <p>{formatDistanceToNow(Props.data.created_at, { addSuffix: true })}</p>
                </div>
            </div>


            <div className='flex gap-1'>
                <button
                    onClick={del}
                    className='mr-2'
                ><Trash2 /></button>
            </div>


        </div>
    )
}
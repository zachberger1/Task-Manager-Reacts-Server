"use client";
import { LoaderIcon, Trash2 } from "lucide-react";
import { ContactsType } from "../Types/contact-type";
import { useRouterRefresh } from "../use-router-refresh";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface Props {
    data: ContactsType;
}

export default function Contact({ data }: Props) {
    const refresh = useRouterRefresh();
    const [loading, setLoading] = useState(false);

    async function del() {
        setLoading(true);
        await fetch("/api/delete-contact", {
            method: "DELETE",
            body: JSON.stringify({ id: data.id }),
            headers: { "Content-Type": "application/json" },
        });
        
        setLoading(false);
        await refresh();
    }

    return (
        <div>
            <div className="bg-[#b7b6b6]bg-white dark:bg-[#1f1f1f] rounded-lg p-4 flex items-center justify-between mx-3 my-1">
                <div className="m-1">
                    <h1 className="text-3xl text-gray-900 dark:text-gray-100">{data.name}</h1>
                    <p className="text-2xl text-gray-700 dark:text-gray-400">{data.number}</p>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon" className="mr-2">
                            {loading ? <LoaderIcon className="animate-spin" /> : <Trash2 className="w-6 h-6" />}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the contact.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={del} disabled={loading}>
                                {loading ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
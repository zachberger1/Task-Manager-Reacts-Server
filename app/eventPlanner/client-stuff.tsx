// app/event-planner/components/EventDrawer.tsx
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

// MUI imports for DateTimePicker

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


export default function EventDrawer() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState<Date | null>(null);
    const [notes, setNotes] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const refresh = useRouterRefresh();
    

    async function handleSubmit() {
        if (!name.trim() || !location.trim() || !time) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        await fetch("/api/create-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                location,
                // convert Date to ISO‑string so your DB will understand
                time: time.toISOString(),
                notes,
            }),
        });
        // reset + close
        setName("");
        setLocation("");
        setTime(null);
        setNotes("");
        setIsOpen(false);
        setLoading(false);
        await refresh();
    }

    return (
        <div>
            <Drawer modal={false} open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="bg-blue-600 p-2 hover:scale-110 transition-all rounded-lg text-white flex items-center m-5 w-[130px] justify-between disabled:opacity-50"
                        onClick={() => setIsOpen(true)}
                    >
                        Add Event{" "}
                        {loading ? (
                            <LoaderIcon className="animate-spin" />
                        ) : (
                            <Plus className="size-6" />
                        )}
                    </button>
                </DrawerTrigger>

                {isOpen && (
                    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" />
                )}



                <DrawerContent className="overflow-visible z-50 bg-[#b7b6b6] dark:bg-[#1f1f1f] p-4 rounded-t-lg">
                    <DrawerHeader>
                        <DrawerTitle>Add Event</DrawerTitle>
                        <DrawerDescription>Enter event details below.</DrawerDescription>
                    </DrawerHeader>

                    <div className="flex flex-col md:flex-row gap-6 px-4">
                        <div className="space-y-4 flex-1 ">
                            <Input

                                type="text"
                                placeholder="Event Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white h-[56px] rounded-lg p-4"
                            />
                            <Input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white h-[56px] rounded-lg p-4"
                            />

                            {/* MUI DateTimePicker */}

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Select Date and Time"
                                    value={time}
                                    onChange={(newVal) => setTime(newVal)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            InputLabelProps: {
                                                style: { color: "white", opacity: "0.5" }, // label text color
                                            },
                                            InputProps: {
                                                style: { color: "white", opacity: "0.5" }, // typed text color
                                            },
                                            className: "dark:bg-gray-800 dark:text-white rounded-lg border text-white",
                                            sx: {
                                                "& .MuiInputBase-root": {
                                                    backgroundColor: "#1F2937", // dark:bg-gray-800
                                                    borderRadius: "0.5rem",
                                                    color: "black", // text color
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "white", // calendar icon
                                                },
                                            },
                                        },
                                        popper: {
                                            modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
                                            sx: {
                                                zIndex: 1500,
                                                "& .MuiPaper-root": {
                                                    backgroundColor: "#1F2937", // dark:bg-gray-800
                                                    color: "white",
                                                    borderRadius: "0.75rem",
                                                },
                                                "& .MuiPickersCalendarHeader-root, \
                                                .MuiPickersDay-root, \
                                                .MuiPickersDay-dayOutsideMonth, \
                                                .MuiPickersDay-today, \
                                                .MuiPickersClockNumber-root, \
                                                .MuiPickersClock-pin, \
                                                .MuiPickersArrowSwitcher-button, \
                                                .MuiTypography-root": {
                                                    color: "white",
                                                },
                                                "& .MuiIconButton-root": {
                                                    color: "white",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>



                        </div>

                        <div className="space-y-4 flex-1">
                            <textarea
                                id="Notes"
                                rows={40}
                                placeholder="Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="dark:bg-gray-800 dark:text-white resize-none rounded-lg p-4 h-[200px] w-full "
                            />
                        </div>
                    </div>

                    <DrawerFooter className="flex gap-2">
                        <Button onClick={handleSubmit}>Save Event</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

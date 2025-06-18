// app/api/create-event/route.ts

import { supabase } from "@/app/config/supabase";
import { NextResponse } from "next/server";


// Disable ISR caching so that every POST immediately writes through
export const revalidate = 0;

export async function POST(request: Request) {
    try {
        const { name, location, time, notes } = await request.json();

        // Basic server‑side validation
        if (!name?.trim() || !location?.trim() || !time?.trim()) {
            return NextResponse.json(
                { error: "Missing required fields: name, location, time" },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from("events")
            .insert([{ name, location, time, notes }])
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // Return the newly created row
        return NextResponse.json(data, { status: 201 });
    } catch (err) {
        console.error("Error in create-event route:", err);
        return NextResponse.json(
            { error: "Invalid request payload" },
            { status: 400 }
        );
    }
}

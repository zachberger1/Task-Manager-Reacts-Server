import { supabase } from "@/app/config/supabase";

export async function POST(request: Request) {

    const body = await request.json();
    await supabase.from("contacts").insert({name: body.name, number: body.number})

    return new Response()


}

import { supabase } from "@/app/config/supabase";

export async function POST(request: Request) {

    const body = await request.json();
    await supabase.from("Websites").insert({name: body.name, url: body.url})

    return new Response()


}

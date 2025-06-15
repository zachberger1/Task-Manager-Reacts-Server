import { supabase } from "@/app/config/supabase";

export async function DELETE(request: Request) {

    const body = await request.json();
    await supabase.from("websites").delete().eq("id", body.id)

    return new Response()


}

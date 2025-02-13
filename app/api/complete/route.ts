import { supabase } from "@/app/config/supabase"

export async function PUT(request: Request) {

const body = await request.json()
await supabase.from("tasks").update({ is_completed: body.is_completed }).eq("id", body.id)    
return new Response()
}
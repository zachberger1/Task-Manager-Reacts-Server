import { supabase } from "@/app/config/supabase"

export async function POST(request: Request) {

const body = await request.json()
await supabase.from("tasks").insert({ task: body.task })
return new Response()
}
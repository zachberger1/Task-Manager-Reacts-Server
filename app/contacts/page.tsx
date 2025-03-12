import { supabase } from "../config/supabase"
import { ContactsType } from "../Types/contact-type"


export const revalidate = 0

export default async function Home() {
    const info = await supabase.from("contacts").select("*").order("id", {ascending: false})   

    const contacts: ContactsType[] = info.data!
    return (
        <div>

            <div>
                {contacts.map(e => (
                    <div key={e.id}>
                        <h1>{e.name}</h1>
                        <p>{e.number}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
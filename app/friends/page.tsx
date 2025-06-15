import ContactDrawer from "./client-stuff";
import Header from "../header";
import { supabase } from "../config/supabase";
import { ContactsType } from "../Types/contact-type";
import Contact from "./contact";

export const revalidate = 0

export default async function Page() {
    const info = await supabase.from("contacts").select("*").order("name", { ascending: true })

    
    const contacts: ContactsType[] = info.data!


    return (
        <div>
            <Header />
            <ContactDrawer />


            <div>
                {contacts.map(e => (
                    <Contact key={e.id} data={e} />
                ))}
            </div>
        </div>
    );
}

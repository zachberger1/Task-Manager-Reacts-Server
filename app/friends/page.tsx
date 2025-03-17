import ContactDrawer from "./client-stuff";
import Header from "../header";
import { supabase } from "../config/supabase";
import { ContactsType } from "../Types/contact-type";
import Contact from "./contact";

interface Props {

    del: () => void

}

export default async function Page(prop: Props) {
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

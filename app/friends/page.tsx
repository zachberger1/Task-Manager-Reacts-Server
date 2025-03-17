import ContactDrawer from "./client-stuff";
import Header from "../header";
import { supabase } from "../config/supabase";
import { ContactsType } from "../Types/contact-type";
import Contact from "./contact";
// import { useRouterRefresh } from "../use-router-refresh";
// import { useRouterRefresh } from "../use-router-refresh";

// interface Props {

//     del: () => void

// }
// export default async function Page(prop: Props)
export default async function Page() {
    const info = await supabase.from("contacts").select("*").order("name", { ascending: true })
    // const refresh = useRouterRefresh()
    
    const contacts: ContactsType[] = info.data!
    // await refresh()

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

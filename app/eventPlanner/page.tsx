
import { supabase } from "../config/supabase";
import Header from "../header";
import { EventsType } from "../Types/event-type";
import EventDrawer from "./client-stuff";
import Event from "./event"; 

export const revalidate = 0

export default async function Page() {
    
    const info = await supabase.from("events").select("*").order("name", { ascending: true })

    const events: EventsType[] = info.data!
    return (
        <div >
            <Header />
            <EventDrawer />
            <div>
                {events.map(e => (
                    <Event key={e.id} data={e} />
                ))}
            </div>
        </div>
    );

}

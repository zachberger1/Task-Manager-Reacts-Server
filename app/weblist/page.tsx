
import { supabase } from "../config/supabase";
import Header from "../header";
import { WebsitesType } from "../Types/websites-type";
import WebDrawer from "./client-stuff";
import Website from "./website";

      

export const revalidate = 0

export default async function Page() {
    const info = await supabase.from("websites").select("*").order("name")


    const websites: WebsitesType[] = info.data!

    
    return (
        <div>
            <Header />
            <WebDrawer />


            <div>
                {websites.map(e => (
                    <Website key={e.id} data={e} />
                ))}
            </div>
        </div>

    );
}

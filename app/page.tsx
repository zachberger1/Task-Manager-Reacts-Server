import AddTask from "./addTask";
import { supabase } from "./config/supabase";
import Header from "./header";
import Task from "./taks";
import { TaskType } from "./Types/task-type";

export const revalidation = 0

export default async function Home() {
    const info = await supabase.from("tasks").select("*").order("id", {ascending: false})   

    const tasks: TaskType[] = info.data!
    return (
        <div>
            <Header />
            <AddTask />
            <div>
                {tasks.map(e => (
                    <Task key={e.id} data={e} />
                ))}
            </div>
        </div>
    )
}
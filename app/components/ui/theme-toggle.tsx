"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "./switch"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Switch
            checked={theme === "dark"}
            onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-1 w-[2.7rem] h-[1.5rem] bg-zinc-300 data-[state=checked]:bg-zinc-700"
            thumbClassName={cn("bg-white transition-colors duration-200", theme === "dark" && "bg-zinc-800")}
        >
            {theme === "dark" ? <Moon className="h-3 w-3 text-white" /> : <Sun className="h-3 w-3 text-zinc-700" />}
        </Switch>
    )
}


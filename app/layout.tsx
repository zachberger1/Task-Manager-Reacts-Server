import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Aurora from  '../components/ui/aurora';


export const metadata: Metadata = {
  title: "Task Manager",
  description: "Devloped by Zach Berger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body className="antialiased text-black bg-white dark:bg-black dark:text-white">

        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}

        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

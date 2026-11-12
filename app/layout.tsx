import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "About America", description: "Independent news, explainers and facts about the United States." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
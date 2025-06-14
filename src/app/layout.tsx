// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"; // Recommended by shadcn
import "./globals.css";
import { cn } from "@/lib/utils"; // shadcn utility
import { ThemeProvider } from "@/components/theme-provider"; // Our ThemeProvider

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans", // For shadcn
});

export const metadata: Metadata = {
  title: "Kadripathi KN - AI & Aerospace Portfolio",
  description: "Futuristic portfolio of Kadripathi KN, Machine Learning Engineer.",
  // Add more meta tags for SEO and futuristic feel later
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning for next-themes */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark", // Enforce dark theme by default
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to dark theme
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
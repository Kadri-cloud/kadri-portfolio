// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { Separator } from "@/components/ui/separator"; // shadcn separator

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
        {/* <div className="flex justify-center space-x-6 mb-6">
           Add social icons using shadcn Button variant="ghost" size="icon"
        </div>
        <Separator className="my-6" /> */}
        <p>
          © {currentYear} Kadripathi KN. All Rights Reserved.
        </p>
        <p className="mt-1">
          Engineered with <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">Next.js</Link>,
          {' '} <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">Tailwind CSS</Link>,
          {' & '} <Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">shadcn/ui</Link>.
        </p>
      </div>
    </footer>
  );
}
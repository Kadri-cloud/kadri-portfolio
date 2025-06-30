// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/your-username', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Email', href: 'mailto:kadripathi.knk@gmail.com', icon: Mail },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mt-auto border-t border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center text-center text-sm text-muted-foreground">
        <div className="flex justify-center space-x-4 mb-6">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label={social.name}
                className="group rounded-full h-10 w-10 hover:bg-primary/10 transition-all duration-300"
              >
                <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              </Button>
            </Link>
          ))}
        </div>
        
        <Separator className="my-4 w-1/4" />
        
        <p>
          © {currentYear} Kadripathi KN. All Rights Reserved.
        </p>
        <p className="mt-2">
          Engineered with <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">Next.js</Link>,
          {' '} <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">Tailwind CSS</Link>,
          {' & '} <Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">shadcn/ui</Link>.
        </p>
      </div>
    </motion.footer>
  );
}
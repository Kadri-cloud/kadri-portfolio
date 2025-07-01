// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
// UPDATED: Imported new icons for your links
import { Github, Linkedin, Mail, Phone, GraduationCap, BookMarked } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // UPDATED: Added all your new links and icons
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Kadri-cloud/', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kadripathi-kn/', icon: Linkedin },
    { name: 'ResearchGate', href: 'https://www.researchgate.net/profile/Kadripathi-K-N', icon: BookMarked },
    { name: 'Google Scholar', href: 'https://scholar.google.com/citations?user=y62GU5IAAAAJ&hl=en', icon: GraduationCap },
    { name: 'Email', href: 'mailto:hello@kadri-kn.com', icon: Mail },
    { name: 'Phone', href: 'tel:+447733110656', icon: Phone },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mt-auto border-t border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center text-center text-sm text-muted-foreground">
        <div className="flex justify-center flex-wrap gap-x-2 sm:gap-x-4 mb-6">
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
        {/* UPDATED: Replaced the "Engineered with" text */}
        <p className="mt-2">
          This app is engineered and build by Kadri.
        </p>
      </div>
    </motion.footer>
  );
}
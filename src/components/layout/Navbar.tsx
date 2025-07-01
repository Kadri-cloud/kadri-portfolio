// src/components/layout/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Home, UserCog, Bot, Briefcase, Rocket } from "lucide-react";
import AIChat from "@/components/chat/AIChat";

interface NavItem {
  title: string;
  href?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  
  // --- START: HIDE ON SCROLL LOGIC ---
  const [isHeaderVisible, setHeaderVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const controlNavbar = () => {
      // Don't run this logic if the chat modal is open
      if (isChatOpen) {
        setHeaderVisible(true);
        return;
      }

      if (typeof window !== 'undefined') {
        // If scrolling down and past the header height, hide it
        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
          setHeaderVisible(false);
        } else { // If scrolling up, show it
          setHeaderVisible(true);
        }
        // Remember the new scroll position for the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY, isChatOpen]);
  // --- END: HIDE ON SCROLL LOGIC ---

  const mainNavItems: NavItem[] = [
    { title: "Home", href: "/", icon: Home, description: "Return to the main hub" },
    { title: "Expertise", href: "/expertise", icon: UserCog, description: "Explore my skills" },
    { title: "Projects", href: "/projects", icon: Briefcase, description: "View my work" },
    {
      title: "Chat AI",
      icon: Bot,
      description: "Interact with my AI",
      onClick: () => setIsChatOpen(true)
    },
  ];

  return (
    <>
      {/* --- WRAP HEADER IN MOTION.HEADER FOR ANIMATION --- */}
      <motion.header 
        animate={{ y: isHeaderVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-soft-light">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary rounded-full filter blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary rounded-full filter blur-3xl animate-[pulse_12s_ease-in-out_infinite_2s]" />
            </div>
        </div>
        
        <div className="container flex h-20 max-w-screen-2xl items-center justify-center md:justify-start relative px-4 sm:px-6">
          <Link
            href="/"
            className="md:mr-6 flex items-center space-x-2 group relative z-10"
            onMouseEnter={() => setHoveredItem("logo")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative">
              <Rocket className="h-7 w-7 text-primary transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] group-hover:rotate-[30deg] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_var(--primary)] animate-[subtle-float_5s_ease-in-out_infinite]" />
            </div>
            <span className="font-bold text-xl inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-[length:300%_auto] animate-[gradient-flow_6s_ease_infinite] group-hover:bg-[length:200%_auto] transition-all duration-500">
              Kadri KN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex flex-grow justify-center z-10">
            <NavigationMenuList className="space-x-2">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = item.href ? pathname === item.href : false;
                const isHovered = hoveredItem === item.title;
                const navItemContent = (
                  <>
                    <IconComponent className={cn("h-5 w-5 mb-1 transition-all duration-300", isActive && "text-primary", "group-hover/navitem:scale-110")}/>
                    <div className={cn("text-xs font-medium transition-colors", isActive ? "text-primary" : "text-muted-foreground", "group-hover/navitem:text-foreground")}>{item.title}</div>
                    {isActive && <motion.div layoutId="desktop-active-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                    {isHovered && !isActive && <motion.div layoutId="desktop-hover-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-border rounded-full" />}
                  </>
                );
                return (
                  <NavigationMenuItem
                    key={item.title}
                    className="group/navitem"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(navigationMenuTriggerStyle(), "relative flex flex-col items-center justify-center h-full w-24 rounded-lg transition-colors hover:bg-accent/50", isActive ? "bg-accent/80" : "bg-transparent")}
                        >
                           {navItemContent}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <button onClick={item.onClick} className={cn(navigationMenuTriggerStyle(), "relative flex flex-col items-center justify-center h-full w-24 rounded-lg transition-colors hover:bg-accent/50 bg-transparent")}>
                        {navItemContent}
                      </button>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation (This will stay visible) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-2xl border-t border-border/20"
      >
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-[gradient-flow_3s_ease_infinite]" />
        <nav className="flex justify-around items-center h-full">
          {mainNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.href ? pathname === item.href : false;
            const mobileNavItem = (
              <div className="relative flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full">
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-indicator"
                    className="absolute inset-0 bg-primary/20 rounded-xl"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                )}
                <IconComponent className={cn("h-6 w-6 transition-colors duration-300", isActive ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-[10px] font-medium transition-colors duration-300", isActive ? "text-primary" : "text-muted-foreground")}>
                  {item.title}
                </span>
              </div>
            );
            return item.href ? (
              <Link key={item.title} href={item.href} className="no-underline">
                {mobileNavItem}
              </Link>
            ) : (
              <button key={item.title} onClick={item.onClick}>
                {mobileNavItem}
              </button>
            );
          })}
        </nav>
      </motion.div>
      <AnimatePresence>
        {isChatOpen && <AIChat onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
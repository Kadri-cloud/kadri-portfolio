// src/components/layout/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Home, UserCog, Bot, Rocket, Briefcase, X } from "lucide-react";
import AIChat from "@/components/chat/AIChat";

interface NavItem {
  title: string;
  href?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const mainNavItems: NavItem[] = [
    { title: "Home", href: "/", icon: Home, description: "Return to the main hub" },
    { title: "Expertise", href: "/expertise", icon: UserCog, description: "Explore my skills" },
    { title: "Projects", href: "/projects", icon: Briefcase, description: "View my work" },
    { 
      title: "Chat AI", 
      icon: Bot, 
      description: "Interact with my AI",
      onClick: () => {
        setIsChatOpen(true);
        setIsMobileMenuOpen(false); // Close mobile menu if open
      }
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60 overflow-hidden">
        {/* Particle background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/10 animate-float" // animate-float uses keyframes from StyleManager
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Holographic grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Dynamic light effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-soft-light">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary rounded-full filter blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary rounded-full filter blur-3xl animate-[pulse_12s_ease-in-out_infinite_2s]" />
        </div>

        <div className="container flex h-20 max-w-screen-2xl items-center relative px-4 sm:px-6">
          {/* Logo with advanced effects */}
          <Link 
            href="/" 
            className="mr-4 md:mr-6 flex items-center space-x-2 group relative z-10"
            onMouseEnter={() => setHoveredItem("logo")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative">
              <Rocket className="h-7 w-7 text-primary transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] group-hover:rotate-[30deg] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_var(--primary)] animate-[subtle-float_5s_ease-in-out_infinite]" />
              <div className={`absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out ${hoveredItem === "logo" ? "animate-[ripple_1.5s_ease-out_infinite]" : ""}`} />
            </div>
            <span 
              className="font-bold text-xl hidden sm:inline-block bg-clip-text text-transparent 
                         bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                         bg-[length:300%_auto] animate-[gradient-flow_6s_ease_infinite]
                         group-hover:bg-[length:200%_auto] transition-all duration-500"
            >
              Kadri KN
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-700 ease-out group-hover:w-full" />
          </Link>

          {/* Desktop Navigation with 3D effect */}
          <NavigationMenu className="hidden md:flex flex-grow justify-center z-10">
            <NavigationMenuList className="space-x-2">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = item.href ? pathname === item.href : false;
                const isHovered = hoveredItem === item.title;

                const navItemContent = (
                  <>
                    <div className={cn(
                      "absolute -top-[2px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full",
                      "transition-all duration-300 ease-out",
                      isHovered ? "w-3/4" : "w-0"
                    )} />
                    
                    <div className={cn(
                      "mb-1 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] relative",
                      "group-hover/navitem:scale-125 group-hover/navitem:animate-[icon-glow-pulse_2s_ease-in-out_infinite]",
                      isActive ? "scale-110 text-primary animate-[icon-glow-pulse_2s_ease-in-out_infinite_0.5s]" : ""
                    )}>
                      <IconComponent className="h-5 w-5" />
                      <div className={cn(
                        "absolute inset-0 rounded-full bg-primary/10 scale-0",
                        "transition-transform duration-700 ease-out",
                        (isHovered || isActive) ? "scale-125 opacity-0" : ""
                      )} />
                    </div>
                    
                    <div className={cn(
                      "text-xs font-medium transition-all duration-500 ease-out",
                      "group-hover/navitem:text-transparent group-hover/navitem:bg-clip-text group-hover/navitem:bg-gradient-to-r group-hover/navitem:from-primary group-hover/navitem:to-cyan-400",
                      isActive ? "text-primary font-semibold" : ""
                    )}>
                      {item.title}
                    </div>
                    
                    {isActive && item.href && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full">
                        <div className="absolute inset-0 bg-primary/30 rounded-full animate-[aurora-underline_3s_ease-out_infinite]" />
                      </div>
                    )}
                    
                    {item.description && (
                      <div className={cn(
                        "absolute top-full mt-3 px-3 py-1.5 text-xs bg-foreground text-background rounded-md",
                        "transition-all duration-300 ease-out opacity-0 translate-y-1 pointer-events-none",
                        "group-hover/navitem:opacity-100 group-hover/navitem:translate-y-0",
                        "shadow-xl shadow-primary/20 whitespace-nowrap z-20", // Added z-20
                        "before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2",
                        "before:w-3 before:h-3 before:bg-foreground before:rotate-45"
                      )}>
                        {item.description}
                      </div>
                    )}
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
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "relative flex flex-col items-center justify-center p-4 h-full rounded-lg",
                            "transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]",
                            "hover:bg-accent/30 hover:shadow-2xl hover:shadow-primary/30",
                            "transform perspective-[1000px] hover:translate-z-[20px]",
                            isActive 
                              ? "bg-primary/15 text-primary-foreground shadow-lg shadow-primary/20" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {navItemContent}
                        </NavigationMenuLink>
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className={cn(
                          "relative flex flex-col items-center justify-center p-4 h-full rounded-lg",
                          "transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]",
                          "hover:bg-accent/30 hover:shadow-2xl hover:shadow-primary/30",
                          "transform perspective-[1000px] hover:translate-z-[20px]",
                          "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {navItemContent}
                      </button>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Trigger */}
          <div className="flex flex-1 items-center justify-end space-x-2 md:hidden z-10">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative rounded-full h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all duration-500 group"
                >
                  <div className="absolute inset-0 rounded-full border border-primary/30 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-700" />
                  <Menu className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[340px] bg-background/95 backdrop-blur-3xl border-l border-border/30 shadow-2xl flex flex-col p-0 overflow-hidden"
              >
                <div className="relative p-6 border-b border-border/30">
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-[gradient-flow_3s_ease_infinite]" />
                  <div className="flex justify-between items-center">
                    <Link 
                      href="/" 
                      className="flex items-center space-x-2 group" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Rocket className="h-7 w-7 text-primary group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500" />
                      <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-[length:300%_auto] animate-[gradient-flow_6s_ease_infinite_0.5s]">
                        Kadri.KN
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full h-8 w-8 hover:bg-primary/10 hover:text-primary"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                
                <div className="flex-grow p-6 overflow-y-auto">
                  <nav className="flex flex-col space-y-3">
                    {mainNavItems.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = item.href ? pathname === item.href : false;
                      
                      const mobileItemContent = (
                        <>
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0",
                            "transition-opacity duration-500 ease-out",
                            "group-hover/mobileitem:opacity-100"
                          )} />
                          
                          <IconComponent className={cn(
                            "h-5 w-5 transition-all duration-500 ease-out relative z-10",
                            "group-hover/mobileitem:scale-125 group-hover/mobileitem:text-primary",
                            isActive ? "text-primary scale-110" : ""
                          )} />
                          <span className={cn(
                            "relative z-10 transition-all duration-500 ease-out flex-grow", // Added flex-grow
                            "group-hover/mobileitem:text-transparent group-hover/mobileitem:bg-clip-text group-hover/mobileitem:bg-gradient-to-r group-hover/mobileitem:from-primary group-hover/mobileitem:to-cyan-400",
                            isActive ? "text-primary font-semibold" : ""
                          )}>
                            {item.title}
                          </span>
                          
                          {item.description && (
                            <span className={cn(
                              "ml-auto text-xs text-muted-foreground transition-colors duration-300 relative z-10 flex-shrink-0 whitespace-nowrap",
                              "hidden group-hover/mobileitem:inline-block group-hover/mobileitem:text-primary/80"
                            )}>
                              {item.description}
                            </span>
                          )}
                        </>
                      );

                      return (
                        <React.Fragment key={item.title}>
                          {item.href ? (
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "group/mobileitem flex items-center space-x-4 rounded-xl p-4 text-base font-medium transition-all duration-500 ease-out",
                                  "hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                                  "relative overflow-hidden",
                                  isActive 
                                    ? "bg-primary/20 text-primary-foreground shadow-md shadow-primary/30" 
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {mobileItemContent}
                              </Link>
                            </SheetClose>
                          ) : (
                            <button
                              onClick={() => {
                                if (item.onClick) item.onClick();
                              }}
                              className={cn(
                                "group/mobileitem flex items-center space-x-4 rounded-xl p-4 text-base font-medium transition-all duration-500 ease-out",
                                "hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                                "relative overflow-hidden w-full text-left",
                                "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {mobileItemContent}
                            </button>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="relative p-6 border-t border-border/30 text-center text-xs text-muted-foreground">
                  <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-secondary to-transparent animate-[gradient-flow_3s_ease_infinite_1s]" />
                  © {new Date().getFullYear()} Kadri.KN
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {isChatOpen && <AIChat onClose={() => setIsChatOpen(false)} />}

      <StyleManager />
    </>
  );
}

const StyleManager = () => (
  <style jsx global>{`
    @keyframes gradient-flow {
      0% { background-position: 0% center; }
      50% { background-position: 100% center; }
      100% { background-position: 0% center; }
    }
    
    @keyframes subtle-float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(2deg); }
    }
    
    @keyframes icon-glow-pulse {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 4px var(--primary)) 
                drop-shadow(0 0 8px color-mix(in oklch, var(--primary) 50%, transparent));
      }
      50% { 
        transform: scale(1.15);
        filter: drop-shadow(0 0 8px var(--primary)) 
                drop-shadow(0 0 16px color-mix(in oklch, var(--primary) 50%, transparent));
      }
    }
    
    @keyframes aurora-underline {
      0% {
        background-position: -200% center;
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
      100% {
        background-position: 200% center;
        opacity: 0.7;
      }
    }
    
    .animate-\\[aurora-underline_3s_ease-out_infinite\\] {
      background-image: linear-gradient(
        to right,
        transparent,
        var(--primary), 
        var(--secondary, var(--primary)), 
        transparent
      );
      background-size: 200% auto;
      animation: aurora-underline 3s ease-out infinite;
    }

    @keyframes ripple {
      0% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    
    @keyframes float { /* Particle float animation */
      0%, 100% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(-10px); }
      75% { transform: translateY(-30px) translateX(5px); }
    }
    
    .animate-float {
      animation-name: float;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    
    .perspective-\\[1000px\\] { perspective: 1000px; }
    .hover\\:translate-z-\\[20px\\]:hover { transform: translateZ(20px); }

    @keyframes pulse { /* For dynamic light effect */
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
    .animate-\\[pulse_8s_ease-in-out_infinite\\] {
      animation: pulse 8s ease-in-out infinite;
    }
    .animate-\\[pulse_12s_ease-in-out_infinite_2s\\] {
      animation: pulse 12s ease-in-out 2s infinite;
    }
  `}</style>
);

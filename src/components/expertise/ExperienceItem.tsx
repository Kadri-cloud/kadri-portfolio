// src/components/expertise/ExperienceItem.tsx
'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ExperienceItemProps {
  role: string;
  company?: string;
  institution?: string; // Add institution as an alternative
  duration: string;
  location: string;
  descriptionPoints: string[];
  isFirst?: boolean;
  isLast?: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function ExperienceItem({
  role,
  company,
  institution, // Destructure institution
  duration,
  location,
  descriptionPoints,
  isFirst = false,
  isLast = false,
  isSelected,
  onClick,
}: ExperienceItemProps) {
  const orgName = company || institution || 'Organization'; // Use company, fallback to institution

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative flex"
    >
      {/* The vertical timeline bar */}
      <div className="flex flex-col items-center mr-6">
        <div className="flex-shrink-0">
          <div className={cn("w-px h-6 bg-border", isFirst && "bg-transparent")} />
        </div>
        <div className={cn("flex-shrink-0 w-4 h-4 rounded-full bg-background border-2 relative z-10 transition-colors duration-300",
             isSelected ? "border-primary" : "border-border")}>
          {isSelected && <div className="absolute inset-0.5 rounded-full bg-primary animate-pulse" />}
        </div>
        <div className={cn("flex-grow w-px bg-border", isLast && "bg-transparent")} />
      </div>

      {/* The clickable card content */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        className={cn(
          "text-left w-full p-4 rounded-lg border transition-all duration-300 mb-6",
          isSelected
            ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
            : "bg-card/60 border-border hover:border-primary/30"
        )}
      >
        <h3 className="font-bold text-lg text-foreground leading-tight">{role}</h3>
        <p className="text-md text-muted-foreground">{orgName} • {location}</p>
        <p className="text-sm text-muted-foreground/80 mt-1 mb-4">{duration}</p>
        
        <ul className="space-y-2 text-foreground/90 text-sm">
          {descriptionPoints.map((point, i) => (
            <li
              key={i}
              className="relative pl-4 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/70"
              dangerouslySetInnerHTML={{ __html: point }}
            />
          ))}
        </ul>
      </motion.button>
    </motion.div>
  );
}
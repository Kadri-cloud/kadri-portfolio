// src/components/expertise/SkillBadge.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SkillBadgeProps {
  skill: string;
  IconComponent?: LucideIcon;
  isHighlighted: boolean;
  delay?: number;
}

const badgeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12, delay }
  }),
  hover: { scale: 1.05 }
};

export default function SkillBadge({ skill, IconComponent, isHighlighted, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      custom={delay}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout // This animates the size/color change smoothly
    >
      <Badge
        variant="outline"
        className={cn(
          "px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out cursor-default flex items-center gap-2 w-full justify-start",
          "border-border bg-card/60 text-muted-foreground hover:border-primary/50",
          isHighlighted && "border-primary/80 bg-primary/20 text-primary shadow-[0_0_12px_theme(colors.primary/0.5)]"
        )}
      >
        {IconComponent && (
          <div className={cn("transition-colors", isHighlighted && "text-primary")}>
            <IconComponent size={16} />
          </div>
        )}
        <span className="truncate">{skill}</span>
        <AnimatePresence>
        {isHighlighted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="ml-auto h-2 w-2 rounded-full bg-primary"
          />
        )}
        </AnimatePresence>
      </Badge>
    </motion.div>
  );
}
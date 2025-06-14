// src/components/expertise/SkillBadge.tsx
'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  level?: 'Expert' | 'Proficient' | 'Familiar';
  IconComponent?: LucideIcon;
}

const badgeVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.1, boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.7)" }
};

export default function SkillBadge({ skill, IconComponent }: SkillBadgeProps) {
  return (
    <motion.div
      className="bg-slate-700 text-sky-300 px-4 py-2 rounded-full text-sm font-medium shadow-md flex items-center gap-2"
      variants={badgeVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.2 }}
    >
      {IconComponent && <span className="text-sky-400"><IconComponent size={18} /></span>}
      {skill}
    </motion.div>
  );
}
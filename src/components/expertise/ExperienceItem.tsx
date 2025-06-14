// src/components/expertise/ExperienceItem.tsx
'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { Briefcase, MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceItemProps {
  role: string;
  company: string;
  duration: string;
  location: string;
  descriptionPoints: string[];
  companyLink?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const itemVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8
    }
  }
};

export default function ExperienceItem({
  role,
  company,
  duration,
  location,
  descriptionPoints,
  companyLink,
  isFirst = false,
  isLast = false
}: ExperienceItemProps) {
  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-slate-900/80 to-slate-800/80",
        "hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-300",
        "backdrop-blur-sm group"
      )}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
    >
      {/* Timeline indicator */}
      {!isFirst && (
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 -translate-y-full"></div>
      )}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary group-hover:shadow-[0_0_10px_rgb(56,189,248)] transition-shadow"></div>
      {!isLast && (
        <div className="absolute left-6 top-1/2 bottom-0 w-0.5 bg-primary/30"></div>
      )}

      <div className="ml-8">
        <div className="flex justify-between items-start mb-4 gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
              {role}
            </h3>
            {companyLink ? (
              <a 
                href={companyLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg text-slate-300 hover:text-primary transition-colors flex items-center group/link"
              >
                {company}
                <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            ) : (
              <p className="text-lg text-slate-300">{company}</p>
            )}
          </div>
          <div className="text-right text-sm text-slate-400 flex-shrink-0">
            <div className="flex items-center justify-end gap-1">
              <CalendarDays size={14} className="text-primary/80" /> 
              <span>{duration}</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <MapPin size={14} className="text-primary/80" /> 
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <ul className="space-y-2 text-slate-300 text-sm md:text-base">
          {descriptionPoints.map((point, index) => (
            <li 
              key={index} 
              className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-primary/70"
              dangerouslySetInnerHTML={{ __html: point }}
            ></li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
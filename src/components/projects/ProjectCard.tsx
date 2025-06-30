// src/components/projects/ProjectCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  links: {
    live?: string;
    github?: string;
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
};

export default function ProjectCard({
  title,
  category,
  image,
  description,
  techStack,
  links
}: ProjectCardProps) {
  const isAiProject = category.toLowerCase().includes('ai');

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border backdrop-blur-sm",
        isAiProject 
          ? "bg-card/80 border-purple-500/20 shadow-[0_0_15px_rgba(192,132,252,0.1)] hover:shadow-[0_0_25px_rgba(192,132,252,0.2)]"
          : "bg-card/80 border-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]",
        "transition-all duration-300"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <Badge 
          variant="secondary" 
          className={cn(
            "absolute top-3 right-3",
            isAiProject ? "bg-purple-500/20 text-purple-300 border-purple-500/50" : "bg-primary/20 text-primary border-primary/50"
          )}
        >
          {category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground flex-grow mb-4">{description}</p>
        
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map(tech => (
              <Badge key={tech} variant="outline" className="border-border text-foreground/80">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          {links.live && (
            <Link href={links.live} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="default" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Button>
            </Link>
          )}
          {links.github && (
            <Link href={links.github} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full border-border">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
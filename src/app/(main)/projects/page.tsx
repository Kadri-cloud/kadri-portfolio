// src/app/(main)/projects/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Rocket, Code, BrainCircuit, Server, Database, GitBranch, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const categoryIcons = {
  'AI/ML': BrainCircuit,
  'Frontend': Code,
  'Backend': Server,
  'Fullstack': Rocket,
  'DevOps': GitBranch,
  'Database': Database
};

export default function ProjectsPage() {
  return (
    <motion.div
      className="container mx-auto px-4 py-8 md:py-12 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Holographic grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 animate-float"
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

      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
          Project Portfolio
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge solutions at the intersection of AI and modern web development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons];
          return (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="h-full bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-primary/20 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
                      <span>{project.title}</span>
                    </CardTitle>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {project.year}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary"
                          className="text-xs font-mono bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Key Features:</h4>
                      <ul className="space-y-1 text-sm">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">▹</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4">
                      {project.liveUrl && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="group/live"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo
                            <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover/live:opacity-100 transition-opacity" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group/code"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            View Code
                            <Code className="ml-1 h-4 w-4 opacity-0 group-hover/code:opacity-100 transition-opacity" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
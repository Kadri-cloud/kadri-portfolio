// src/app/(main)/projects/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/projects/ProjectCard';
import { cn } from '@/lib/utils';

// Based on your CV, we'll create some project data.
const projectsData = [
  {
    title: "Talking Machine: Agentic AI for Airbus",
    category: "Agentic AI",
    image: "/images/projects/talking-machine.png",
    description: "An innovative agentic AI system that provides real-time health diagnostics and interactive maintenance guidance in natural language for complex aircraft landing gear.",
    techStack: ["Python", "LangChain", "FastAPI", "XAI", "Next.js", "PyTorch"],
    links: { github: "https://github.com/your-username/talking-machine" }
  },
  {
    title: "Multi-Agent Orchestration Framework",
    category: "AI Engineering",
    image: "/images/projects/agent-framework.png",
    description: "Core AI framework for QDL, automating the industrial procurement lifecycle. It increased operational efficiency by 60% and reduced human errors by 80%.",
    techStack: ["Agentic AI", "Next.js", "FastAPI", "AWS Lambda", "RAG"],
    links: { live: "https://qdl.com/predictiq", github: "https://github.com/your-username/qdl-framework" }
  },
  {
    title: "Electro Hydrodynamic (EHT) Thruster",
    category: "Hardware & Aerospace",
    image: "/images/projects/eht-thruster.png",
    description: "Pioneered the design, fabrication, and testing of a 3D-printed EHT for space applications, demonstrated at the India International Science Festival.",
    techStack: ["3D Printing", "High Voltage Electronics", "Physics Simulation", "Sensors"],
    links: { github: "https://github.com/your-username/eht-thruster" }
  },
  // Add more projects here as needed
];

const filterCategories = ["All", "Agentic AI", "AI Engineering", "Hardware & Aerospace"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projectsData;
    }
    return projectsData.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 md:py-12 min-h-screen"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
          Project Showcase
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of my work, from enterprise-grade AI systems to innovative hardware engineering.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center flex-wrap gap-2 mb-12"
      >
        {filterCategories.map(category => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            onClick={() => setActiveFilter(category)}
            className={cn("transition-all", activeFilter === category && "shadow-lg shadow-primary/20")}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
// src/app/(main)/expertise/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Brain, Briefcase, Code, Cloud, Layers, GraduationCap, Server, Database, Zap, Rocket, Award, BookOpen, Plane, Atom } from 'lucide-react';
import ExperienceItem from '@/components/expertise/ExperienceItem';
import SkillBadge from '@/components/expertise/SkillBadge';

// BACKGROUND: A single, optimized background component
const GalaxyBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-background" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-40" />
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute rounded-full bg-primary"
        initial={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
        }}
        animate={{ opacity: [0.1, 1, 0.1] }}
        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// REUSABLE COMPONENT: For sections that animate when they scroll into view
const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } },
};

// DATA
const technicalSkills = {
  'AI Specialties': [{ name: "Agentic AI Systems", icon: Rocket }, { name: "LLM Fine-tuning", icon: Brain }, { name: "Multi-Agent Architectures", icon: Layers }, { name: "Explainable AI (XAI)", icon: Zap }, { name: "RAG Architectures", icon: Database }],
  'Engineering & Research': [{ name: "Aerospace Systems", icon: Plane }, { name: "Electrohydrodynamics", icon: Atom }, { name: "3D Printing", icon: Server }, { name: "Published Researcher", icon: BookOpen }, { name: "Award-winning Innovator", icon: Award }],
  'Technical Stack': [{ name: "Python (PyTorch/TF)", icon: Code }, { name: "Next.js/React", icon: Server }, { name: "FastAPI", icon: Code }, { name: "PostgreSQL", icon: Database }, { name: "AWS Cloud", icon: Cloud }],
};
const workExperience = [
  { role: "Applied AI Engineer – NLP and GenAI", company: "Quantum Data Labs Limited (QDL)", duration: "Nov 2024 - Present", location: "Milton Keynes, UK", descriptionPoints: ["Architected core <strong>multi-agent AI framework</strong> enabling MVP delivery in 3 months", "Engineered agentic workflows boosting <strong>60% operational efficiency</strong>", "Deployed full-stack solution with <strong>Next.js</strong> and <strong>FastAPI</strong>", "Developed specialized agents for procurement automation and risk analysis"], skillsUsed: ["Agentic AI Systems", "Multi-Agent Architectures", "FastAPI", "Next.js/React", "AWS Cloud"] },
  { role: "Machine Learning Engineer", company: "Roshen Process Solutions", duration: "Sept 2023 - Nov 2024", location: "Milton Keynes, UK", descriptionPoints: ["Built conversational AI increasing <strong>client acquisition by 40%</strong>", "Developed dynamic pricing engine boosting <strong>profits by 23%</strong>", "Implemented NLP solutions using Hugging Face transformers"], skillsUsed: ["Python (PyTorch/TF)", "Explainable AI (XAI)", "PostgreSQL", "Next.js/React"] }
];
const education = [
  { degree: "MSc Applied Artificial Intelligence", institution: "Cranfield University", duration: "Sept 2022 - Aug 2023", location: "United Kingdom", descriptionPoints: ["Thesis: <strong>\"Talking Machine\"</strong> agentic AI for Airbus landing gear", "Developed novel two-tiered fault diagnosis model (<strong>6% efficiency gain</strong>)", "Integrated <strong>Explainable AI (XAI)</strong> for aviation safety", "Published in <strong>AIAA SciTech Forum</strong>"], skillsUsed: ["Agentic AI Systems", "Explainable AI (XAI)", "Published Researcher", "Python (PyTorch/TF)"] },
  { degree: "BTech Aerospace Engineering", institution: "Jain University", duration: "Aug 2017 - July 2021", location: "India", descriptionPoints: ["Developed <strong>3D-printed EHT thruster</strong> for space applications", "2nd place at <strong>IISF Young Scientists' conference</strong>", "Featured in <strong>India Book of Records</strong> for nano drone design"], skillsUsed: ["Aerospace Systems", "Electrohydrodynamics", "3D Printing", "Award-winning Innovator"] }
];
const awards = [
  { title: "Young Scientist Award", issuer: "India Int'l Science Festival", year: "2020", description: "For innovative research on Electric Propulsion" },
  { title: "India Book of Records", issuer: "National Record", year: "2020", description: "Highest Payload-to-Weight Ratio Drone" },
  { title: "Innovation Hackathon Winner", issuer: "Karnataka State Gov't", year: "2020", description: "Acoustic wave tech for plant growth" }
];

export default function ExpertisePage() {
  const [selectedExperience, setSelectedExperience] = useState<number>(0);

  const highlightedSkills = (
    selectedExperience < workExperience.length 
      ? workExperience[selectedExperience].skillsUsed 
      : education[selectedExperience - workExperience.length]?.skillsUsed
  ) || [];

  return (
    <div className="relative overflow-x-hidden">
      <GalaxyBackground />
      
      <main className="container mx-auto px-4 py-8 md:py-12 min-h-screen relative z-10">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 12 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
            AI & Aerospace
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            An interactive map of my technical universe. Select career and academic nodes below to reveal the skill constellations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* LEFT COLUMN: TIMELINE */}
          <div className="lg:col-span-3 space-y-12">
            <AnimatedSection>
              <motion.h2 variants={itemVariants} className="text-2xl font-bold flex items-center gap-3 mb-6"><Briefcase className="text-primary"/> Professional Journey</motion.h2>
              {workExperience.map((exp, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ExperienceItem {...exp} isSelected={selectedExperience === index} onClick={() => setSelectedExperience(index)} isFirst={index === 0} />
                </motion.div>
              ))}
            </AnimatedSection>

            <AnimatedSection>
              <motion.h2 variants={itemVariants} className="text-2xl font-bold flex items-center gap-3 mb-6"><GraduationCap className="text-primary"/> Academic & Research</motion.h2>
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ExperienceItem {...edu} role={edu.degree} isSelected={selectedExperience === workExperience.length + index} onClick={() => setSelectedExperience(workExperience.length + index)} isFirst={index === 0} isLast={index === education.length - 1} />
                </motion.div>
              ))}
            </AnimatedSection>
            
            <AnimatedSection>
              <motion.h2 variants={itemVariants} className="text-2xl font-bold flex items-center gap-3 mb-6"><Award className="text-primary"/> Honors & Awards</motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {awards.map((award, index) => (
                  <motion.div key={index} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="bg-card/80 border-border hover:border-primary/50 transition-colors h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{award.title}</CardTitle>
                        <CardDescription>{award.issuer} • {award.year}</CardDescription>
                      </CardHeader>
                      <CardContent><p className="text-sm text-muted-foreground">{award.description}</p></CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT COLUMN: STICKY SKILL MATRIX */}
          <div className="lg:col-span-2 lg:sticky top-24 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
            >
              <Card className="bg-card/80 border-primary/20 backdrop-blur-sm shadow-[0_0_20px_rgba(56,189,248,0.1)] relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Code className="text-primary" /> Technical Capabilities</CardTitle>
                  <CardDescription>Skills highlighted by the selected experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(technicalSkills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-md text-muted-foreground mb-3">{category}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <AnimatePresence>
                          {skills.map((skill, index) => (
                              <SkillBadge
                                key={skill.name}
                                skill={skill.name}
                                IconComponent={skill.icon}
                                isHighlighted={highlightedSkills.includes(skill.name)}
                                delay={(index * 0.05)}
                              />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
// src/app/(main)/expertise/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Brain, Briefcase, Rocket, Cpu, Code,  Zap, ArrowRight,  Cloud, Layers, Binary, GraduationCap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ExperienceItem from '@/components/expertise/ExperienceItem';

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
};

const categoryIcons: Record<string, React.ElementType> = {
  'AI/ML': Brain,
  'Frontend': Code,
  'Agentic Systems': Rocket,
  'Cloud': Cloud,
  'Quantum': Binary,
  'DevOps': Cpu
};

interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

interface Metric {
  name: string;
  value: number;
  unit: string;
}

interface System {
  name: string;
  status: string;
  metrics?: Metric[];
}

export default function ExpertisePage() {
  const [activeSystem, setActiveSystem] = useState(0);

  // Current role metrics
  const qdlMetrics = {
    agentsDeployed: 8,
    scmSystems: 3,
    teamSize: 5,
    throughput: '2.4PB',
    latency: '12ms',
    accuracy: '99.7%'
  };

  const technicalSkills: Skill[] = [
    { name: "LLM Orchestration", proficiency: 95, category: "AI/ML" },
    { name: "React/Next.js", proficiency: 90, category: "Frontend" },
    { name: "Agentic Workflows", proficiency: 93, category: "Agentic Systems" },
    { name: "AWS/GCP", proficiency: 85, category: "Cloud" },
    { name: "Quantum Algorithms", proficiency: 82, category: "Quantum" },
    { name: "Kubernetes", proficiency: 88, category: "DevOps" },
    { name: "TensorFlow", proficiency: 91, category: "AI/ML" },
    { name: "TypeScript", proficiency: 94, category: "Frontend" },
    { name: "AutoGen", proficiency: 89, category: "Agentic Systems" },
    { name: "Azure Quantum", proficiency: 78, category: "Quantum" },
    { name: "Docker", proficiency: 87, category: "DevOps" },
    { name: "PyTorch", proficiency: 92, category: "AI/ML" }
  ];

  const groupedSkills = technicalSkills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const quantumSystems: System[] = [
    {
      name: "SCM Core",
      status: "Optimal",
      metrics: [
        { name: "Throughput", value: 98, unit: "%" },
        { name: "Latency", value: 12, unit: "ms" },
        { name: "Accuracy", value: 99.7, unit: "%" }
      ]
    },
    {
      name: "Agent Orchestrator",
      status: "Nominal",
      metrics: [
        { name: "Active Agents", value: 8, unit: "" },
        { name: "Tasks/Min", value: 420, unit: "" },
        { name: "Error Rate", value: 0.3, unit: "%" }
      ]
    },
    {
      name: "Quantum Bridge",
      status: "Online",
      metrics: [
        { name: "Qubits", value: 128, unit: "" },
        { name: "Entanglement", value: 92, unit: "%" },
        { name: "Decoherence", value: 1.2, unit: "%" }
      ]
    }
  ];

  const currentSystem = quantumSystems[activeSystem];

  const workExperience = [
    {
      role: "Senior AI Engineer",
      company: "Quantum Data Labs",
      companyLink: "https://quantumdatalabs.com",
      duration: "2023 - Present",
      location: "Milton Keynes, UK",
      descriptionPoints: [
        "Lead development of next-gen Supply Chain Management (SCM) systems with quantum-enhanced AI",
        "Architect <strong>agentic workflows</strong> coordinating 8+ specialized AI agents",
        "Develop frontend interfaces for complex quantum-AI hybrid systems",
        "Manage team of 5 AI engineers and researchers",
        "Implemented solutions achieving <strong>99.7% accuracy</strong> with 12ms latency",
        "Pioneered quantum-classical hybrid algorithms for supply chain optimization"
      ]
    },
    {
      role: "AI Research Engineer",
      company: "Nexus Analytics",
      companyLink: "https://nexusanalytics.ai",
      duration: "2021 - 2023",
      location: "London, UK",
      descriptionPoints: [
        "Developed ML models for predictive supply chain analytics",
        "Built autoML pipelines reducing model development time by 40%",
        "Led migration of legacy systems to cloud-native AI architecture",
        "Published 2 papers on reinforcement learning for logistics optimization"
      ]
    }
  ];

  const education = [
    {
      degree: "MSc Artificial Intelligence",
      institution: "University of Cambridge",
      institutionLink: "https://www.cam.ac.uk",
      duration: "2019 - 2021",
      location: "Cambridge, UK",
      descriptionPoints: [
        "Specialized in multi-agent systems and quantum machine learning",
        "Thesis: <strong>Decentralized AI for Supply Chain Resilience</strong>",
        "Cambridge Trust Scholar"
      ]
    },
    {
      degree: "BSc Computer Science",
      institution: "Imperial College London",
      institutionLink: "https://www.imperial.ac.uk",
      duration: "2016 - 2019",
      location: "London, UK",
      descriptionPoints: [
        "First Class Honors",
        "Best Undergraduate Thesis Award",
        "President of AI Society"
      ]
    }
  ];

  return (
    <motion.div
      className="container mx-auto px-4 py-8 md:py-12 min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Holographic grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Floating quantum particles */}
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

      <motion.div className="text-center mb-12" variants={sectionVariants}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
          Quantum Expertise Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Building the future of AI-driven quantum supply chain systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Left Sidebar - Skills & Systems */}
        <motion.div className="lg:col-span-1 space-y-6 md:space-y-8" variants={sectionVariants}>
          {/* Quantum Data Labs Metrics */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-primary/20 backdrop-blur-sm shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Binary className="text-primary" size={20} />
                <span>Quantum Data Labs</span>
              </CardTitle>
              <CardDescription>Current role metrics</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3 border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{qdlMetrics.agentsDeployed}</div>
                <div className="text-xs text-muted-foreground">AI Agents</div>
              </div>
              <div className="border rounded-lg p-3 border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{qdlMetrics.scmSystems}</div>
                <div className="text-xs text-muted-foreground">SCM Systems</div>
              </div>
              <div className="border rounded-lg p-3 border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{qdlMetrics.teamSize}</div>
                <div className="text-xs text-muted-foreground">Team Size</div>
              </div>
              <div className="border rounded-lg p-3 border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{qdlMetrics.throughput}</div>
                <div className="text-xs text-muted-foreground">Throughput</div>
              </div>
              <div className="border rounded-lg p-3 border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{qdlMetrics.latency}</div>
                <div className="text-xs text-muted-foreground">Latency</div>
              </div>
              <div className="border rounded-lg p-3 border-primary/20 text-center">
                <div className="text-2xl font-bold text-primary">{qdlMetrics.accuracy}</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Matrix */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-primary/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="text-primary" size={20} />
                <span>Core Competencies</span>
              </CardTitle>
              <CardDescription>Technical skill matrix</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue={Object.keys(groupedSkills)[0] || ''} className="w-full">
                <TabsList className="grid grid-cols-2 h-auto gap-1">
                  {Object.keys(groupedSkills).map(category => {
                    const IconComponent = categoryIcons[category];
                    return (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="py-2 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                      >
                        {IconComponent && <IconComponent className="h-3.5 w-3.5 mr-1.5" />}
                        {category.split('/')[0]}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {Object.entries(groupedSkills).map(([category, skills]) => (
                  <TabsContent key={category} value={category} className="space-y-4 mt-4">
                    {skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{skill.name}</span>
                          <span className="font-mono text-foreground/80">{skill.proficiency}%</span>
                        </div>
                        <Progress
                          value={skill.proficiency}
                          className={cn(
                            "h-2",
                            category === 'AI/ML' && '[&>div]:bg-purple-500',
                            category === 'Frontend' && '[&>div]:bg-blue-500',
                            category === 'Agentic Systems' && '[&>div]:bg-cyan-500',
                            category === 'Quantum' && '[&>div]:bg-indigo-500',
                            category === 'Cloud' && '[&>div]:bg-orange-500',
                            category === 'DevOps' && '[&>div]:bg-green-500'
                          )}
                        />
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Quantum Systems */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Rocket className="text-green-400" size={20} />
                <span>Quantum Systems</span>
              </CardTitle>
              <CardDescription>Real-time system status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {quantumSystems.map((system, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSystem(index)}
                    className={cn(
                      "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      activeSystem === index
                        ? "bg-green-500/20 text-green-300 border border-green-500/50 shadow-md shadow-green-500/20"
                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/70"
                    )}
                  >
                    {system.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSystem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 pt-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200">{currentSystem.name}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        currentSystem.status === 'Nominal' && "border-blue-400/50 text-blue-300",
                        currentSystem.status === 'Optimal' && "border-green-400/50 text-green-300",
                        currentSystem.status === 'Online' && "border-purple-400/50 text-purple-300"
                      )}
                    >
                      {currentSystem.status}
                    </Badge>
                  </div>

                  {currentSystem.metrics?.map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{metric.name}</span>
                        <span className="font-mono text-foreground/80">{metric.value}{metric.unit}</span>
                      </div>
                      <Progress
                        value={metric.name === 'Error Rate' || metric.name === 'Decoherence' ? 
                               metric.value * 100 : metric.value}
                        className={cn(
                          "h-1.5",
                          (metric.name === 'Error Rate' || metric.name === 'Decoherence') && '[&>div]:bg-red-500',
                          metric.value > 90 && '[&>div]:bg-green-500',
                          metric.value > 70 && '[&>div]:bg-yellow-500',
                          metric.value <= 70 && '[&>div]:bg-blue-500'
                        )}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Area */}
        <motion.div className="lg:col-span-3 space-y-6 md:space-y-8" variants={sectionVariants}>
          {/* Professional Experience */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-primary/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Briefcase className="text-primary" size={20} />
                <CardTitle>Professional Trajectory</CardTitle>
              </div>
              <CardDescription>Career timeline with key achievements</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-0">
                {workExperience.map((exp, index) => (
                  <ExperienceItem
                    key={index}
                    role={exp.role}
                    company={exp.company}
                    companyLink={exp.companyLink}
                    duration={exp.duration}
                    location={exp.location}
                    descriptionPoints={exp.descriptionPoints}
                    isFirst={index === 0}
                    isLast={index === workExperience.length - 1}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-primary/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layers className="text-primary" size={20} />
                <CardTitle>Academic Foundations</CardTitle>
              </div>
              <CardDescription>Education and research milestones</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "p-6 rounded-lg border border-primary/20 bg-gradient-to-br from-slate-900/70 to-slate-800/70",
                    "hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300",
                    "backdrop-blur-sm"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary">
                      <GraduationCap size={24} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
                        {edu.degree}
                      </h3>
                      {edu.institutionLink ? (
                        <a
                          href={edu.institutionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-md text-slate-300 hover:text-primary transition-colors flex items-center group/link"
                        >
                          {edu.institution}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                        </a>
                      ) : (
                        <p className="text-md text-slate-300">{edu.institution}</p>
                      )}
                      <p className="text-sm text-slate-400 mb-3 mt-1">
                        {edu.duration} • {edu.location}
                      </p>
                      {edu.descriptionPoints && (
                        <ul className="space-y-1.5 text-slate-300 text-sm">
                          {edu.descriptionPoints.map((point, i) => (
                            <li
                              key={i}
                              className="relative pl-4 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/70"
                              dangerouslySetInnerHTML={{ __html: point }}
                            ></li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
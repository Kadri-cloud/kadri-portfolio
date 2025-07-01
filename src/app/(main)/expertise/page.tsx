// src/app/(main)/expertise/page.tsx
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, GraduationCap, CheckCircle, BrainCircuit, Code, Users, Cpu, FileText, Award, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const TechBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-background">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
  </div>
);

// --- DATA (No changes needed here) ---
const timelineData = [
  { id: 'qdl', type: 'work', title: 'Applied AI Engineer – NLP and GenAI', company: 'Quantum Data Labs (QDL)', duration: 'Nov 2024 – Present', description: "At a pioneering AI start-up, I architected and led the development of the core multi-agent AI orchestration framework, a foundational system enabling the rapid delivery of the company's flagship MVP.", highlights: [ { text: "Engineered agentic AI workflows, boosting pilot customer operational efficiency by 60% and reducing human errors by 80%.", icon: BrainCircuit }, { text: "Developed key agents including a Market Analyser for real-time cost estimation and an Award Recommender for objective bid evaluation.", icon: Users }, { text: "Deployed the entire system as a full-stack solution using Next.js for the frontend and FastAPI for the high-performance AI backend.", icon: Code }, ], skills: ['Agentic AI', 'Multi-Agent Systems', 'RAG', 'LLM Fine-Tuning', 'FastAPI', 'Next.js', 'Python', 'AWS', 'Docker'] },
  { id: 'roshen', type: 'work', title: 'Machine Learning Engineer', company: 'Roshen Process Solutions', duration: 'Sept 2023 – Nov 2024', description: "For an IT consultancy specializing in AI-driven procurement, I developed intelligent systems that directly translated to significant business growth and client satisfaction.", highlights: [ { text: "Spearheaded the development of a conversational AI assistant that achieved a 40% increase in client acquisition for sales operations.", icon: BrainCircuit }, { text: "Designed a dynamic pricing engine that leveraged behavioral insights, increasing company profit margins by 23% and customer retention by 33%.", icon: Cpu }, ], skills: ['Conversational AI', 'Predictive Modeling', 'NLP', 'PyTorch', 'Scikit-learn', 'REST APIs'] },
  { id: 'tcs', type: 'work', title: 'Graduate Data Analyst', company: 'Tata Consultancy Services (TCS)', duration: 'Dec 2021 – Aug 2022', description: "At a global IT and consulting powerhouse, I applied data analysis and machine learning techniques to solve complex challenges for clients in the banking sector.", highlights: [ { text: "Developed predictive models for credit risk and fraud detection, enhancing security and minimizing financial losses.", icon: Cpu }, { text: "Utilized data analytics to predict customer churn, enabling targeted retention strategies that successfully reduced attrition rates.", icon: Users }, ], skills: ['Data Analysis', 'Pandas', 'NumPy', 'Matplotlib', 'Classification', 'Regression', 'Clustering'] },
  { id: 'cranfield', type: 'education', title: 'MSc, Applied Artificial Intelligence', company: 'Cranfield University, UK', duration: 'Sept 2022 – Aug 2023', description: 'Specialized in applying AI to complex, real-world industrial problems, culminating in a thesis project in collaboration with Airbus.', highlights: [ { text: 'Thesis: Architected "Talking Machine," an innovative agentic AI system for real-time health diagnostics and maintenance of Airbus landing gear.', icon: FileText }, { text: "Engineered a novel two-tiered fault diagnosis model that achieved a 6% operational efficiency gain over existing Airbus benchmarks.", icon: BrainCircuit }, { text: "Embedded trust and transparency by integrating Explainable AI (XAI) into the diagnostic pipeline, bolstering safety for critical aviation systems.", icon: Code }, ], skills: ['Agentic AI', 'Explainable AI (XAI)', 'Fault Diagnosis', 'PyTorch', 'Aerospace Systems', 'Published Research'] },
  { id: 'jain', type: 'education', title: 'BTech, Aerospace Engineering', company: 'Jain University, India', duration: 'Aug 2017 – July 2021', description: 'A comprehensive engineering program focused on aeronautics and astronautics, with a strong emphasis on hands-on projects and innovative research.', highlights: [ { text: "Final Project: Successfully developed a 3D-printed Electrohydrodynamic (EHT) Thruster for space applications, pioneering its design and testing.", icon: FileText }, { text: "Secured 2nd place at the prestigious Young Scientists' Conference (IISF) for demonstrating the EHT project.", icon: BrainCircuit }, { text: "Featured in the India Book of Records for designing and building the 'Highest Payload-to-Weight Ratio Brushed Nano Drone'.", icon: Code }, ], skills: ['Aerospace Engineering', 'Propulsion Systems', '3D Printing', 'Electronics', 'Award-winning Innovation'] }
];

const awardsData = [
    { title: "Young Scientist", issuer: "Govt. of India, IISF", year: "2020", description: "For innovative research on Electric Propulsion presented at the Young Scientists' Conference." },
    { title: "India Book of Records", issuer: "National Record", year: "2020", description: "For building the 'Highest Payload-to-Weight Ratio Brushed Nano Drone'." },
    { title: "State Innovation Hackathon Winner", issuer: "Karnataka State Govt.", year: "2020", description: "For developing an innovative technology that utilises acoustic waves to improve plant growth." },
    { title: "India Innovation Challenge Finalist", issuer: "Govt. of India & Texas Instruments", year: "2018", description: "In recognition of outstanding innovation among thousands of participants." }
];

const DetailCard = ({ item }: { item: typeof timelineData[0] }) => (
  <Card className="bg-card/80 border-border/50 backdrop-blur-sm shadow-xl shadow-background">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-foreground">{item.title}</CardTitle>
      <CardDescription className="text-base">{item.company} • {item.duration}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-6">{item.description}</p>
      <h4 className="font-semibold text-foreground mb-4">Key Highlights</h4>
      <ul className="space-y-3 mb-8">
        {item.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-foreground/90">{highlight.text}</span>
          </li>
        ))}
      </ul>
      <h4 className="font-semibold text-foreground mb-4">Core Technologies & Skills</h4>
      <div className="flex flex-wrap gap-2">
        {item.skills.map(skill => (
          <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function ExpertisePageFinal() {
  const [selectedId, setSelectedId] = useState<string | null>(timelineData[0].id);
  const [arrowStyle, setArrowStyle] = useState({});
  const timelineRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // --- FIX: Create refs for mobile accordion items ---
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedItem = useMemo(() => 
    timelineData.find(item => item.id === selectedId)
  , [selectedId]);

  useEffect(() => {
    const selectedIndex = timelineData.findIndex(item => item.id === selectedId);
    if (selectedIndex === -1) return;
    
    // For desktop arrow
    const selectedRef = timelineRefs.current[selectedIndex];
    if (selectedRef) {
      const top = selectedRef.offsetTop + selectedRef.offsetHeight / 2;
      setArrowStyle({ top: `${top}px` });
    }
  }, [selectedId]);

  // --- FIX: New handler for mobile accordion click ---
  const handleMobileClick = (itemId: string, index: number) => {
    const newSelectedId = selectedId === itemId ? null : itemId;
    setSelectedId(newSelectedId);

    // After state update, scroll the clicked item into view
    if (newSelectedId !== null) {
      // Use a timeout to ensure the scroll happens after the DOM has updated
      setTimeout(() => {
        accordionRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50); // A small delay is sometimes needed for the animation to start
    }
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden">
      <TechBackground />
      <main className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">My Professional Trajectory</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">A journey from aerospace engineering to pioneering agentic AI. Select a node to explore the details of my experience.</p>
        </motion.div>

        <div className="relative">
          {/* DESKTOP: 2-Column Layout */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-4">
              {timelineData.map((item, index) => (
                <button
                  key={item.id}
                  ref={el => timelineRefs.current[index] = el}
                  onClick={() => setSelectedId(item.id)}
                  className={cn("w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-start gap-4", selectedId === item.id ? "bg-primary/10 border-primary/50" : "bg-card/80 border-border hover:bg-muted/50")}
                >
                   <div className={cn("mt-1 flex-shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center", selectedId === item.id ? "border-primary bg-primary/20" : "border-border bg-card")}>
                    {item.type === 'work' ? <Briefcase className={cn("h-4 w-4", selectedId === item.id ? "text-primary" : "text-muted-foreground")} /> : <GraduationCap className={cn("h-4 w-4", selectedId === item.id ? "text-primary" : "text-muted-foreground")} />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 lg:sticky top-24 h-fit">
              <AnimatePresence mode="wait">
                {selectedItem && (
                  <motion.div key={selectedId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
                    <DetailCard item={selectedItem} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <motion.div className="hidden lg:block absolute left-[33.33%] -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-border" style={arrowStyle} animate={{ top: arrowStyle.top }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} />

          {/* MOBILE: Accordion Layout */}
          <div className="block lg:hidden space-y-4">
            {timelineData.map((item, index) => (
              // --- FIX: Add ref to the container div ---
              <div key={item.id} ref={el => accordionRefs.current[index] = el} className="border-b border-border/50 last:border-b-0 scroll-mt-20">
                {/* --- FIX: Use the new click handler --- */}
                <button onClick={() => handleMobileClick(item.id, index)} className="w-full text-left p-4 flex justify-between items-center">
                  <div className="flex items-start gap-4">
                    <div className={cn("mt-1 flex-shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center", selectedId === item.id ? "border-primary bg-primary/20" : "border-border bg-card")}>
                        {item.type === 'work' ? <Briefcase className={cn("h-4 w-4", selectedId === item.id ? "text-primary" : "text-muted-foreground")} /> : <GraduationCap className={cn("h-4 w-4", selectedId === item.id ? "text-primary" : "text-muted-foreground")} />}
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                    </div>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", selectedId === item.id ? "rotate-180 text-primary" : "rotate-0")} />
                </button>
                <AnimatePresence>
                  {selectedId === item.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                      <div className="p-4 pt-0">
                        <DetailCard item={item} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        
        <motion.div className="mt-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.15 }}>
            <motion.div variants={{hidden: {opacity:0, y:-20}, visible:{opacity:1, y:0}}} className="mx-auto max-w-3xl text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Honors & Achievements</h2>
                <p className="mt-4 text-lg text-muted-foreground">Key recognitions for innovation and research contributions.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {awardsData.map((award, index) => (
                    <motion.div key={index} variants={{hidden: {opacity:0, y:20}, visible:{opacity:1, y:0}}}>
                        <Card className="h-full bg-card/80 border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all duration-300">
                            <CardHeader>
                                <div className="mb-2"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Award className="w-5 h-5 text-primary"/></div></div>
                                <CardTitle>{award.title}</CardTitle>
                                <CardDescription>{award.issuer} • {award.year}</CardDescription>
                            </CardHeader>
                            <CardContent><p className="text-sm text-muted-foreground">{award.description}</p></CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </main>
    </div>
  );
}
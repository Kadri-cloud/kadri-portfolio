// src/app/(main)/page.tsx
'use client';

import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Download, BrainCircuit, Layers, Cloud, Server, GitBranch, TerminalSquare, FileText, Star, ExternalLink, FileDown } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useTheme } from 'next-themes';
import { ResponsivePie } from '@nivo/pie';
import { KADRI_OS_PERSONA } from '@/lib/persona';
// --- STEP 1: IMPORT DATA FROM THE CENTRALIZED FILE ---
import { publications } from '@/lib/data';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};
const cardHoverVariants = {
  hover: {
    y: -5,
    transition: { duration: 0.3 }
  }
};
const futuristicGlow = "shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]";
const aiGlow = "shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:shadow-[0_0_25px_rgba(192,132,252,0.6)]";
const techStackData = [
  { "id": "Python Ecosystem", "label": "Python Ecosystem", "value": 30, "color": "hsl(204, 70%, 50%)" },
  { "id": "AI/ML Frameworks", "label": "AI/ML", "value": 25, "color": "hsl(264, 70%, 50%)" },
  { "id": "LLM & Agentic AI", "label": "LLM/Agents", "value": 20, "color": "hsl(29, 70%, 50%)" },
  { "id": "Full-Stack (JS/TS)", "label": "JS/TS Stack", "value": 15, "color": "hsl(53, 70%, 50%)" },
  { "id": "Cloud & DevOps", "label": "Cloud/DevOps", "value": 10, "color": "hsl(344, 70%, 50%)" }
];
// --- STEP 2: REMOVE THE OLD LOCAL PUBLICATIONS ARRAY ---
// The publications data is now imported from `lib/data.ts`.

interface ChatMessage {
  id: number;
  sender: 'user' | 'system';
  text: string | JSX.Element;
  timestamp?: string;
}

export default function LandingDashboardPage() {
  const { theme } = useTheme();

  const metrics = {
    operationalEfficiencyBoost: 60,
    errorReduction: 80,
    researchPapers: publications.length, // Now dynamically counts the papers
    keyAchievements: 5,
    projectsDeployed: 12,
    aiAgentsCreated: 8,
  };
  const coreSkills = [
    { name: "LLM & Agentic AI", level: 95, icon: <BrainCircuit className="h-4 w-4" /> },
    { name: "Deep Learning (PyTorch/TF)", level: 90, icon: <Layers className="h-4 w-4" /> },
    { name: "Full-Stack (Next.js/FastAPI)", level: 85, icon: <Server className="h-4 w-4" /> },
    { name: "Cloud AI (AWS)", level: 82, icon: <Cloud className="h-4 w-4" /> },
    { name: "Explainable AI (XAI)", level: 80, icon: <BrainCircuit className="h-4 w-4" /> },
    { name: "CI/CD & DevOps", level: 75, icon: <GitBranch className="h-4 w-4" /> }
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isKadriOsTyping, setIsKadriOsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < KADRI_OS_PERSONA.welcomeMessages.length) {
        setChatMessages(prev => [...prev, {
          id: Date.now() + i,
          sender: 'system',
          text: KADRI_OS_PERSONA.welcomeMessages[i],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
        }]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatInputRef.current && window.innerWidth > 768) {
      chatInputRef.current.focus();
    }
  }, []);
  
  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isKadriOsTyping) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
    };
    
    const updatedMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsKadriOsTyping(true);
    
    const apiHistory = [
      { role: 'assistant', content: KADRI_OS_PERSONA.welcomeMessage },
      ...updatedMessages
        .filter(msg => typeof msg.text === 'string')
        .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text as string,
        }))
    ];
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiHistory })
      });

      if (!response.ok) {
        throw new Error('API response was not ok.');
      }

      const data = await response.json();
      
      const systemResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: 'system',
        text: data.content || KADRI_OS_PERSONA.defaultResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
      };
      setChatMessages(prev => [...prev, systemResponse]);

    } catch (error) {
      console.error("Failed to get response from AI:", error);
      const errorResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: 'system',
        text: KADRI_OS_PERSONA.defaultResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
      };
      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsKadriOsTyping(false);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <motion.div
        className="container mx-auto min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-12 overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl">
          
          <motion.div
            className="md:col-span-1 lg:col-span-3 h-full"
            variants={itemVariants}
          >
            <motion.div
              variants={cardHoverVariants}
              className={`relative overflow-hidden h-full ${futuristicGlow} backdrop-blur-sm bg-card/80 border border-primary/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                  >
                    <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-primary/50">
                      <AvatarImage src="/images/profile.jpg" alt="Kadripathi KN" />
                      <AvatarFallback>KKN</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
                      KADRIPATHI KN
                    </CardTitle>
                    <div className="h-8 mt-1">
                      <TypeAnimation
                        sequence={[
                          'Agentic AI Engineer', 1500,
                          'LLM & NLP Specialist', 1500,
                          'Full-Stack AI Developer', 1500,
                          'Aerospace Innovator', 1500,
                        ]}
                        wrapper="p"
                        cursor={true}
                        repeat={Infinity}
                        className="text-lg sm:text-xl text-muted-foreground"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 sm:pt-2 flex-grow">
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">
                    AI/ML Engineer specializing in designing and deploying autonomous agentic AI systems for complex industrial applications. Proven success in translating business challenges into measurable outcomes, delivering a multi-agent framework that boosted operational efficiency by {metrics.operationalEfficiencyBoost}% and reduced errors by {metrics.errorReduction}%.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="border rounded-lg p-2 text-center border-primary/20">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{`${metrics.operationalEfficiencyBoost}%+`}</div>
                        <div className="text-xs text-muted-foreground">Efficiency Boost</div>
                    </div>
                     <div className="border rounded-lg p-2 text-center border-primary/20">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{`${metrics.errorReduction}%`}</div>
                        <div className="text-xs text-muted-foreground">Error Reduction</div>
                    </div>
                    <div className="border rounded-lg p-2 text-center border-primary/20">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{metrics.researchPapers}</div>
                        <div className="text-xs text-muted-foreground">Publications</div>
                    </div>
                     <div className="border rounded-lg p-2 text-center border-primary/20">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{`${metrics.keyAchievements}+`}</div>
                        <div className="text-xs text-muted-foreground">Key Achievements</div>
                    </div>
                     <div className="border rounded-lg p-2 text-center border-primary/20">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{`${metrics.projectsDeployed}+`}</div>
                        <div className="text-xs text-muted-foreground">Deployed Projects</div>
                    </div>
                     <div className="border rounded-lg p-2 text-center border-primary/20">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{`${metrics.aiAgentsCreated}+`}</div>
                        <div className="text-xs text-muted-foreground">AI Agents Built</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-auto pt-4">
                    <Link href="/expertise">
                      <Button variant="default" size="lg" className="group">
                        Explore Expertise <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/kadri-ai-ml-cv.pdf" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="lg" className="border-primary/50">
                        <Download className="mr-2 h-5 w-5" /> Download CV
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-1 lg:col-span-2 h-full"
            variants={itemVariants}
          >
            <motion.div
              className={`h-full flex flex-col ${aiGlow} backdrop-blur-sm bg-black/85 border border-purple-500/40 rounded-xl overflow-hidden`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader className="p-3 border-b border-purple-500/30 flex-shrink-0">
                  <CardTitle className="flex items-center text-sm font-mono text-purple-300">
                    <TerminalSquare className="mr-2 h-5 w-5" />
                    KadriOS :: Interactive Mode
                  </CardTitle>
                </CardHeader>
                <CardContent 
                  ref={chatContainerRef} 
                  className="p-3 flex-grow font-mono text-xs text-green-300 space-y-2 overflow-y-auto max-h-[350px] sm:max-h-[450px] scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent"
                >
                  {chatMessages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === 'user' ? (
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-1 flex-shrink-0">user@kadripathi:~$</span>
                          <p className="whitespace-pre-wrap break-words flex-grow">{msg.text}</p>
                        </div>
                      ) : (
                         <div className="flex items-start">
                           <span className="text-purple-400 mr-1 flex-shrink-0">KadriOS></span>
                           <div className="whitespace-pre-wrap break-words flex-grow">{msg.text}</div>
                         </div>
                      )}
                      {msg.timestamp && <span className="text-gray-500 text-[10px] ml-auto block text-right pr-1">{msg.timestamp}</span>}
                    </div>
                  ))}
                  {isKadriOsTyping && (
                    <div className="flex items-start">
                      <span className="text-purple-400 mr-1">KadriOS></span>
                      <p className="text-gray-400 animate-pulse">KadriOS is typing<span className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.1s]">.</span><span className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.2s]">.</span><span className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.3s]">.</span></p>
                    </div>
                  )}
                   {!isKadriOsTyping && chatMessages.length > 0 && chatMessages[chatMessages.length -1]?.sender === 'system' && (
                     <div className="flex items-start">
                        <span className="text-purple-400 mr-1">KadriOS></span>
                        <span className="animate-[caret-blink_1s_ease-out_infinite] text-green-300">▋</span>
                    </div>
                   )}
                </CardContent>
                <div className="p-2 border-t border-purple-500/30 flex-shrink-0">
                  <form onSubmit={handleChatSubmit} className="flex items-center w-full">
                    <span className="font-mono text-sm text-cyan-400 mr-2 flex-shrink-0">user@kadripathi:~$</span>
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-grow bg-transparent text-green-200 placeholder-green-600 focus:outline-none font-mono text-sm w-full"
                      placeholder="Ask about skills, projects..."
                      disabled={isKadriOsTyping}
                    />
                     <Button type="submit" size="sm" variant="ghost" className="ml-2 text-green-400 hover:bg-green-500/20 p-1" disabled={!chatInput.trim() || isKadriOsTyping}>
                        <ArrowRight className="h-4 w-4"/>
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="md:col-span-1 lg:col-span-2 h-full" variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              className={`h-full flex flex-col ${aiGlow} backdrop-blur-sm bg-card/80 border border-purple-500/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BrainCircuit className="mr-2 h-6 w-6 text-purple-400" /> Core Skills
                  </CardTitle>
                  <CardDescription>Technical proficiency levels</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4 text-sm">
                  {coreSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-1">
                        {React.cloneElement(skill.icon, {className: "h-4 w-4 text-purple-400"})}
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="ml-auto font-mono text-xs text-purple-400">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} indicatorColor="bg-purple-400" className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="md:col-span-1 lg:col-span-3 h-full" variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              className={`h-full flex flex-col ${futuristicGlow} backdrop-blur-sm bg-card/80 border border-primary/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Layers className="mr-2 h-6 w-6 text-primary" /> Tech Stack Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of primary technologies used in projects</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow h-64 sm:h-72">
                  <ResponsivePie
                    data={techStackData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    innerRadius={0.5} padAngle={0.7} cornerRadius={3} activeOuterRadiusOffset={8}
                    colors={{ scheme: theme === 'dark' ? 'nivo' : 'set3' }}
                    borderWidth={1} borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    arcLinkLabelsSkipAngle={10} arcLinkLabelsTextColor={theme === 'dark' ? '#ccc' : '#333'}
                    arcLinkLabelsThickness={2} arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10} arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', theme === 'dark' ? 3 : 2 ] ] }}
                    motionConfig="gentle"
                    theme={{
                      labels: { text: { fill: theme === 'dark' ? '#ffffff' : '#000000', fontSize: '10px' } },
                      tooltip: { container: { background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' } },
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div className="md:col-span-2 lg:col-span-5 h-full" variants={itemVariants}>
            <motion.div
              variants={cardHoverVariants}
              className={`h-full flex flex-col ${futuristicGlow} backdrop-blur-sm bg-card/80 border border-primary/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="mr-2 h-6 w-6 text-primary" /> Research Publications
                  </CardTitle>
                  <CardDescription>Author of {metrics.researchPapers} papers in AI, Aerospace, and Applied Physics</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4 text-sm pt-2">
                  {/* --- STEP 3: UPDATE THE RENDERING LOGIC --- */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                      {publications.map((pub, index) => (
                          <div key={index} className="flex items-start gap-3">
                              <Star className="h-4 w-4 text-primary/70 mt-1 flex-shrink-0" />
                              <div>
                                  <p className="font-semibold text-foreground/90 leading-snug">{pub.title}</p>
                                  <p className="text-xs text-muted-foreground/80 mt-1 italic">{pub.authors}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{pub.journal}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                      {pub.externalLink && (
                                          <Link href={pub.externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-primary/90 hover:text-primary hover:underline">
                                              <ExternalLink className="mr-1.5 h-3 w-3" />
                                              View Site
                                          </Link>
                                      )}
                                      {pub.pdfLink && (
                                          <Link href={pub.pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-primary/90 hover:text-primary hover:underline">
                                              <FileDown className="mr-1.5 h-3 w-3" />
                                              Download PDF
                                          </Link>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
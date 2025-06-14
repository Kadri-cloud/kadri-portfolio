// src/app/(main)/page.tsx
'use client';

import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Download, BrainCircuit, Briefcase, Code, Layers, Cloud, Server, GitBranch, Database, TerminalSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useTheme } from 'next-themes';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { KADRI_OS_PERSONA } from '@/lib/persona';

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
    // boxShadow is now part of aiGlow/futuristicGlow directly applied or overridden
  }
};

const futuristicGlow = "shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]";
const aiGlow = "shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:shadow-[0_0_25px_rgba(192,132,252,0.6)]";

const techStackData = [
  { "id": "Python", "label": "Python", "value": 35, "color": "hsl(204, 70%, 50%)" },
  { "id": "TensorFlow/PyTorch", "label": "TF/PyTorch", "value": 30, "color": "hsl(29, 70%, 50%)" },
  { "id": "LLMs", "label": "LLMs", "value": 20, "color": "hsl(344, 70%, 50%)" },
  { "id": "Cloud", "label": "Cloud", "value": 15, "color": "hsl(210, 70%, 50%)" }
];

const projectData = [
  { "year": "2024", "Production": 4, "Research": 2, "Open Source": 3 },
  { "year": "2023", "Production": 3, "Research": 4, "Open Source": 2 },
  { "year": "2022", "Production": 2, "Research": 3, "Open Source": 1 }
];

interface ChatMessage {
  id: number;
  sender: 'user' | 'system';
  text: string | JSX.Element;
  timestamp?: string;
}

export default function LandingDashboardPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('projects');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isKadriOsTyping, setIsKadriOsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const metrics = {
    projectsDeployed: 12,
    aiAgentsCreated: 8,
    modelsInProduction: 7,
    researchPapers: 9,
    githubContributions: 423,
    cloudDeployments: 15
  };

  // CORRECTED: Moved coreSkills definition before the useEffect that uses it.
  const coreSkills = [
    { name: "Machine Learning", level: 95, icon: <BrainCircuit className="h-4 w-4" /> },
    { name: "Deep Learning", level: 90, icon: <Layers className="h-4 w-4" /> },
    { name: "LLM Development", level: 88, icon: <Code className="h-4 w-4" /> },
    { name: "Cloud AI", level: 85, icon: <Cloud className="h-4 w-4" /> },
    { name: "Data Engineering", level: 80, icon: <Database className="h-4 w-4" /> },
    { name: "Full Stack", level: 75, icon: <Server className="h-4 w-4" /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

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
        // Send the profile summary automatically
        setTimeout(() => {
          setChatMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'system',
            // Now coreSkills is defined and can be accessed here
            text: `Profile Summary: Kadripathi KN is currently focused on developing next-generation quantum-AI hybrid systems at Quantum Data Labs. His core expertise spans ${coreSkills.length} technical areas with ${metrics.projectsDeployed}+ production deployments.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
          }]);
        }, 1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []); // Added KADRI_OS_PERSONA.welcomeMessages, coreSkills.length and metrics.projectsDeployed to dependency array if they can change, though for this specific logic it might be intended to run once. For now, keeping it as is based on original.

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
    };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsKadriOsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: KADRI_OS_PERSONA.systemPrompt },
            ...chatMessages
              .filter(msg => msg.sender === 'user' || msg.sender === 'system')
              .map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: typeof msg.text === 'string' ? msg.text : '' // Ensure JSX elements are not sent as empty strings if not handled by API
              })),
            { role: 'user', content: chatInput }
          ]
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const newSystemMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'system',
        text: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
      };
      setChatMessages(prev => [...prev, newSystemMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'system',
        text: 'System temporarily unavailable. Kadripathi specializes in: ' +
              coreSkills.slice(0, 3).map(s => s.name).join(', '), // coreSkills is now accessible
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsKadriOsTyping(false);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <motion.div
        className={`container mx-auto min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8 md:py-12 overflow-x-hidden ${isScrolling ? 'scrolling' : ''}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 w-full max-w-7xl">
          
          <motion.div
            className="md:col-span-1 lg:col-span-3 h-full"
            variants={itemVariants}
            whileHover="hover"
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
                          'AI/ML Engineer', 1500,
                          'LLM Specialist', 1500,
                          'Full Stack Developer', 1500,
                          'Cloud AI Architect', 1500,
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
                    Building intelligent systems that bridge AI research with production-ready applications. Specializing in LLMs, agentic systems, and scalable AI infrastructure.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {Object.entries(metrics).map(([key, value]) => (
                        <div key={key} className="border rounded-lg p-2 text-center border-primary/20">
                            <div className="text-xl sm:text-2xl font-bold text-primary">
                                {key === 'githubContributions' ? `${value}+` : value}
                                {key === 'projectsDeployed' && '+'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                                    .replace("Ai", "AI").replace("Github","GitHub")}
                            </div>
                        </div>
                    )).slice(0,6)}
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-auto pt-4">
                    <Link href="/projects">
                      <Button variant="default" size="lg" className="group">
                        View Projects <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer">
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
                    KadriOS :: Interactive Mode v1.0
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
                           {/* CORRECTED: Escaped > to > to prevent potential parsing issues */}
                           <span className="text-purple-400 mr-1 flex-shrink-0">KadriOS></span>
                           <div className="whitespace-pre-wrap break-words flex-grow">{msg.text}</div>
                         </div>
                      )}
                      {msg.timestamp && <span className="text-gray-500 text-[10px] ml-auto block text-right pr-1">{msg.timestamp}</span>}
                    </div>
                  ))}
                  {isKadriOsTyping && (
                    <div className="flex items-start">
                      <span className="text-purple-400 mr-1">KadriOS></span> {/* Also escaped here for consistency */}
                      <p className="text-gray-400 animate-pulse">KadriOS is typing<span className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.1s]">.</span><span className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.2s]">.</span><span className="animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite_0.3s]">.</span></p>
                    </div>
                  )}
                   {!isKadriOsTyping && (chatMessages.length === 0 || chatMessages[chatMessages.length -1]?.sender === 'system') && (
                     <div className="flex items-start">
                        <span className="text-purple-400 mr-1">KadriOS></span> {/* Also escaped here for consistency */}
                        <span className="animate-[caret-blink_1s_ease-out_infinite] text-green-300">▋</span>
                    </div>
                   )}
                </CardContent>
                <div className="p-2 border-t border-purple-500/30 flex-shrink-0">
                  <form onSubmit={handleChatSubmit} className="flex items-center w-full">
                    <span className="font-mono text-sm text-cyan-400 mr-2 flex-shrink-0">user@kadripathi:~$</span>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-grow bg-transparent text-green-200 placeholder-green-600 focus:outline-none font-mono text-sm w-full"
                      placeholder="Ask about skills, projects..."
                      autoFocus={typeof window !== 'undefined' && window.innerWidth > 768}
                    />
                     <Button type="submit" size="sm" variant="ghost" className="ml-2 text-green-400 hover:bg-green-500/20 p-1">
                        <ArrowRight className="h-4 w-4"/>
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="md:col-span-1 lg:col-span-2 h-full" variants={itemVariants} whileHover="hover">
            <motion.div
              variants={{ hover: { ...cardHoverVariants.hover, boxShadow: '0 10px 25px -5px rgba(192,132,252,0.4)'} }}
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

          <motion.div className="md:col-span-1 lg:col-span-3 h-full" variants={itemVariants} whileHover="hover">
            <motion.div
              variants={cardHoverVariants}
              className={`h-full flex flex-col ${futuristicGlow} backdrop-blur-sm bg-card/80 border border-primary/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Code className="mr-2 h-6 w-6 text-primary" /> Tech Stack
                  </CardTitle>
                  <CardDescription>Primary technology distribution</CardDescription>
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

          <motion.div className="md:col-span-2 lg:col-span-3 h-full" variants={itemVariants} whileHover="hover">
            <motion.div
              variants={cardHoverVariants}
              className={`h-full flex flex-col ${futuristicGlow} backdrop-blur-sm bg-card/80 border border-primary/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center text-xl">
                      <Briefcase className="mr-2 h-6 w-6 text-primary" /> Projects Timeline
                    </CardTitle>
                    <div className="flex space-x-1">
                      <Button variant={activeTab === 'projects' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('projects')}>By Type</Button>
                      <Button variant={activeTab === 'timeline' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('timeline')}>By Year</Button>
                    </div>
                  </div>
                  <CardDescription>Evolution of my work</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow h-64 sm:h-72">
                  {activeTab === 'projects' ? (
                    <ResponsiveBar
                      data={projectData} keys={['Production', 'Research', 'Open Source']} indexBy="year"
                      margin={{ top: 20, right: 20, bottom: 40, left: 40 }} padding={0.3}
                      colors={{ scheme: theme === 'dark' ? 'nivo' : 'category10' }}
                      axisBottom={{ tickSize: 0, tickPadding: 10, legend: 'Year', legendOffset: 30, legendPosition: 'middle' }}
                      axisLeft={{ tickSize: 0, tickPadding: 10, legend: 'Project Count', legendOffset: -35, legendPosition: 'middle' }}
                      theme={{
                        axis: { ticks: { text: { fill: theme === 'dark' ? '#ccc' : '#333' } }, legend: { text: { fill: theme === 'dark' ? '#ccc' : '#333' } } },
                        grid: { line: { stroke: theme === 'dark' ? '#555' : '#eee', strokeWidth: 1 } },
                        tooltip: { container: { background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' } },
                        labels: { text: { fontSize: '10px' } }
                      }}
                    />
                  ) : ( <div className="h-full flex items-center justify-center text-muted-foreground">Timeline data view coming soon...</div> )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="md:col-span-1 lg:col-span-2 h-full" variants={itemVariants} whileHover="hover">
             <motion.div
              variants={{ hover: { ...cardHoverVariants.hover, boxShadow: '0 10px 25px -5px rgba(192,132,252,0.4)'} }}
              className={`h-full flex flex-col ${aiGlow} backdrop-blur-sm bg-card/80 border border-purple-500/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <GitBranch className="mr-2 h-6 w-6 text-purple-400" /> GitHub
                  </CardTitle>
                  <CardDescription>Recent contributions</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 sm:space-y-4 text-sm flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Total Contributions</div>
                    <div className="text-xl font-bold text-purple-400">{metrics.githubContributions}+</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Repositories</div>
                    <div className="text-xl font-bold text-purple-400">24+</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Stars Earned</div>
                    <div className="text-xl font-bold text-purple-400">128+</div>
                  </div>
                  <div className="pt-2 sm:pt-4">
                    <div className="text-sm text-muted-foreground mb-2">Recent Activity</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-400" /><span>Updated LLM fine-tuning repo</span></div>
                      <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-400" /><span>Merged PR to vector DB project</span></div>
                      <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-purple-400" /><span>New AI agent template</span></div>
                    </div>
                  </div>
                  <Link href="https://github.com/yourusername" target="_blank" className="mt-auto block pt-4">
                    <Button variant="outline" size="sm" className="w-full border-purple-400/50 text-purple-400 hover:text-purple-300 hover:border-purple-400">
                      View Profile on GitHub
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="md:col-span-1 lg:col-span-5 h-full" variants={itemVariants} whileHover="hover">
            <motion.div
              variants={cardHoverVariants}
              className={`h-full flex flex-col ${futuristicGlow} backdrop-blur-sm bg-card/80 border border-primary/20 rounded-xl`}
            >
              <Card className="bg-transparent border-none h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Cloud className="mr-2 h-6 w-6 text-primary" /> Cloud Platforms
                  </CardTitle>
                  <CardDescription>Experience with major cloud providers</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 sm:space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Total Cloud Deployments</div>
                    <div className="text-xl font-bold text-primary">{metrics.cloudDeployments}+</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      { name: 'AWS', value: 8, total: metrics.cloudDeployments, color: "bg-orange-400", services: ["Sagemaker", "EC2", "S3", "Lambda"] },
                      { name: 'GCP', value: 5, total: metrics.cloudDeployments, color: "bg-blue-400", services: ["Vertex AI", "GKE", "Cloud Run"] },
                      { name: 'Azure', value: 2, total: metrics.cloudDeployments, color: "bg-sky-400", services: ["Azure ML", "AKS", "Functions"] },
                    ].map(platform => (
                      <div key={platform.name} className="border border-primary/10 p-3 rounded-lg">
                        <div className="flex justify-between text-sm font-semibold mb-1">
                          <span>{platform.name}</span>
                          <span>{platform.value} deploys</span>
                        </div>
                        <Progress value={(platform.value / platform.total) * 100} indicatorColor={platform.color} className="h-2 mb-2" />
                        <div className="text-xs text-muted-foreground mb-1">Key Services:</div>
                        <div className="flex flex-wrap gap-1">
                          {platform.services.map(service => (
                            <Badge key={service} variant="outline" className="text-xs border-primary/30 text-primary/80">{service}</Badge>
                          ))}
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
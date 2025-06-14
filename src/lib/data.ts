// src/lib/data.ts
import { LucideIcon, Brain,  Cpu, GraduationCap, DraftingCompass,  Lightbulb, UserCheck, Zap } from 'lucide-react';

export interface Skill {
  name: string;
  IconComponent?: LucideIcon;
  category: 'Languages' | 'Frameworks/Libraries' | 'Tools' | 'Concepts' | 'ML/AI' | 'Cyberphysical';
  proficiency?: number;
}

export interface Experience {
  role: string;
  company: string;
  companyLink?: string;
  location: string;
  duration: string;
  descriptionPoints: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  institutionLink?: string;
  location: string;
  duration: string;
  descriptionPoints?: string[];
  IconComponent?: LucideIcon;
}

export interface AvionicSystem {
  name: string;
  status: 'Nominal' | 'Optimal' | 'Online' | 'Engaged' | 'Warning' | 'Critical';
  IconComponent?: LucideIcon;
  metrics?: {
    name: string;
    value: number;
    unit: string;
  }[];
}

export const technicalSkills: Skill[] = [
  // Programming Languages
  { name: 'Python', IconComponent: Code, category: 'Languages' },
  { name: 'SQL', IconComponent: Code, category: 'Languages' },
  { name: 'JavaScript', IconComponent: Code, category: 'Languages' },
  { name: 'HTML', IconComponent: Code, category: 'Languages' },
  { name: 'CSS', IconComponent: Code, category: 'Languages' },

  // ML/AI
  { name: 'TensorFlow', IconComponent: Brain, category: 'ML/AI' },
  { name: 'PyTorch', IconComponent: Brain, category: 'ML/AI' },
  { name: 'Keras', IconComponent: Brain, category: 'ML/AI' },
  { name: 'Scikit-learn', IconComponent: Brain, category: 'ML/AI' },
  { name: 'NLP (Transformers, BERT)', IconComponent: Brain, category: 'ML/AI' },
  { name: 'Computer Vision (OpenCV)', IconComponent: Brain, category: 'ML/AI' },
  { name: 'Generative AI', IconComponent: Lightbulb, category: 'ML/AI' },
  { name: 'Explainable AI (XAI)', IconComponent: UserCheck, category: 'ML/AI' },

  // Data Manipulation & Visualization
  { name: 'NumPy', IconComponent: DraftingCompass, category: 'Tools' },
  { name: 'Pandas', IconComponent: DraftingCompass, category: 'Tools' },
  { name: 'Matplotlib', IconComponent: DraftingCompass, category: 'Tools' },
  { name: 'Seaborn', IconComponent: DraftingCompass, category: 'Tools' },
  { name: 'Plotly', IconComponent: DraftingCompass, category: 'Tools' },

  // Software Engineering & Tools
  { name: 'Docker', IconComponent: Cpu, category: 'Tools' },
  { name: 'Git & GitHub', IconComponent: Code, category: 'Tools' },
  { name: 'Azure (Basic)', IconComponent: Cpu, category: 'Tools' },
  { name: 'Hadoop & Spark (Basic)', IconComponent: Cpu, category: 'Tools' },
  { name: 'Next.js', IconComponent: Code, category: 'Frameworks/Libraries' },
  { name: 'React', IconComponent: Code, category: 'Frameworks/Libraries' },
  { name: 'Tailwind CSS', IconComponent: Code, category: 'Frameworks/Libraries' },
];

export const workExperience: Experience[] = [
  {
    role: 'Full Stack AI Engineer',
    company: 'IONA DRONES LTD',
    location: 'United-Kingdom',
    duration: 'Sept 2023 - Present',
    descriptionPoints: [
      'Developed a hyper-realistic Digital Twin to enhance user experience.',
      'Integrated real-time data from drones via radio frequency and LTE technology.',
      'Created a software layer that seamlessly binds various hardware components.',
    ],
  },
  {
    role: 'Junior Machine Learning Engineer',
    company: 'Roshen Process Solutions',
    companyLink: 'https://roshenps.com',
    location: 'Milton Keynes, United Kingdom',
    duration: 'Sept 2023 - Present',
    descriptionPoints: [
      'Developed an intelligent conversational assistant for sales procurement, boosting client acquisition by 40%.',
      'Designed a real-time recommendation system for Aramco\'s industrial machinery.',
      'Designed industrial-grade software package enabling the smooth functioning of IoT devices.',
      'Experienced in developing custom software and website development.',
    ],
  },
  {
    role: 'Graduate Software Programmer – Python',
    company: 'Tata Consultancy Services (TCS)',
    location: 'Bangalore, India',
    duration: 'Dec 2021 - Aug 2022',
    descriptionPoints: [
      'Developed predictive models for credit risk assessment and fraud detection.',
      'Utilized data analytics to predict customer churn, reducing attrition rates.',
      'Utilized data analysis techniques to segment customers based on their financial behavior.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'MSc Applied Artificial Intelligence',
    institution: 'Cranfield University',
    location: 'United Kingdom',
    duration: 'Sept 2022 - Aug 2023',
    IconComponent: GraduationCap,
    descriptionPoints: [
      '<strong>Modules:</strong> Statistical Learning Methods, Data Analytics and Visualisation, Deep Learning, Systems Engineering, Intelligent Cyber-Physical Systems, Search and Optimisation, Logic and Automated Reasoning.',
      '<strong>Thesis:</strong> Collaborated with Airbus on fault detection for landing gear, designed a two-tiered fault diagnosis model (6% efficiency improvement), incorporated XAI, and published/implemented the "Talking Machine" conversational AI.',
    ],
  },
  {
    degree: 'BTech Aerospace Engineering',
    institution: 'Jain University',
    location: 'India',
    duration: 'Aug 2017 - July 2021',
    IconComponent: Rocket,
    descriptionPoints: [
      '<strong>Modules:</strong> Aerodynamics, Space Propulsion, Flight Mechanics, Avionics etc.',
      '<strong>Final Year Project:</strong> Developed a 3D-printed Electro Hydrodynamic Thruster (EHT), demonstrated at IISF, securing 2nd position.',
    ],
  },
];

export const avionicSystems: AvionicSystem[] = [
  { name: 'Flight Control System', status: 'Nominal', IconComponent: Zap },
  { name: 'Navigation Systems (GPS/INS)', status: 'Optimal', IconComponent: Zap },
  { name: 'Communication Suite', status: 'Online', IconComponent: Zap },
  { name: 'AI Co-pilot "KAI"', status: 'Engaged', IconComponent: Brain },
];


// src/lib/data.ts
import { Code, Rocket} from 'lucide-react';

export const projects = [
  {
    id: 'scm-quantum',
    title: 'Quantum SCM',
    description: 'Next-gen supply chain management with quantum optimization',
    year: '2024',
    category: 'Fullstack',
    techStack: ['Qiskit', 'Next.js', 'TypeScript', 'AWS Lambda'],
    features: [
      'Quantum-enhanced routing algorithms',
      'Real-time anomaly detection',
      'Multi-agent coordination system',
      '3x faster than classical solutions'
    ],
    liveUrl: 'https://quantumdatalabs.com/scm',
    githubUrl: null
  },
  {
    id: 'agentic-workflows',
    title: 'Agentic Orchestrator',
    description: 'Framework for autonomous AI agent coordination',
    year: '2023',
    category: 'AI/ML',
    techStack: ['Python', 'PyTorch', 'AutoGen', 'LangChain'],
    features: [
      'Dynamic agent team formation',
      'Self-healing workflows',
      'Real-time monitoring dashboard',
      'Supports 8+ agent types'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/yourusername/agentic-orchestrator'
  },
  {
    id: 'quantum-dashboard',
    title: 'Quantum Dashboard',
    description: 'Visualization tool for quantum computing workflows',
    year: '2023',
    category: 'Frontend',
    techStack: ['React', 'D3.js', 'WebGL', 'TypeScript'],
    features: [
      'Interactive circuit builder',
      'Statevector visualization',
      'Gate-level debugging',
      'Real-time simulation'
    ],
    liveUrl: 'https://quantum-dashboard.vercel.app',
    githubUrl: 'https://github.com/yourusername/quantum-dashboard'
  },
  {
    id: 'ai-research',
    title: 'AI Research Platform',
    description: 'Collaborative environment for AI research teams',
    year: '2022',
    category: 'Fullstack',
    techStack: ['Next.js', 'FastAPI', 'MongoDB', 'Docker'],
    features: [
      'Jupyter notebook integration',
      'Experiment tracking',
      'Paper recommendation engine',
      'Team knowledge graph'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/yourusername/ai-research-platform'
  },
  {
    id: 'edge-ai',
    title: 'Edge AI Framework',
    description: 'Optimized AI models for edge devices',
    year: '2022',
    category: 'AI/ML',
    techStack: ['TensorFlow Lite', 'ONNX', 'Rust', 'Kubernetes'],
    features: [
      'Model quantization toolkit',
      'Hardware-aware optimization',
      'Federated learning support',
      '12ms inference latency'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/yourusername/edge-ai-framework'
  },
  {
    id: 'data-pipeline',
    title: 'Quantum Data Pipeline',
    description: 'ETL system for quantum-classical hybrid data',
    year: '2021',
    category: 'Backend',
    techStack: ['Python', 'Apache Beam', 'BigQuery', 'Terraform'],
    features: [
      'Handles 2.4PB daily',
      'Quantum-resistant encryption',
      'Auto-scaling architecture',
      '99.99% uptime'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/yourusername/quantum-data-pipeline'
  }
];
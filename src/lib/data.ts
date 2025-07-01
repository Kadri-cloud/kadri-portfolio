

// src/lib/data.ts
import {
  BrainCircuit,
  Layers,
  Server,
  Cloud,
  GitBranch,
  LucideIcon
} from 'lucide-react';

// You can keep other data like skills or experience here in the future.

export interface Publication {
  title: string;
  journal: string;
  authors: string;
  pdfLink: string | null;
  externalLink: string | null;
}

export const publications: Publication[] = [
  { 
    title: "Revolutionizing Human-Machine Interaction: Conversational AI for Intuitive Aircraft Landing Gear Diagnostics", 
    journal: "AIAA, SciTech 2026 (under review)",
    authors: "Kadripathi KN, et al.",
    pdfLink: null,
    externalLink: null
  },
  { 
    title: "Integrating Explainable AI into Two-Tier ML Models for Trustworthy Aircraft Landing Gear Fault Diagnosis", 
    journal: "AIAA, SciTech 2025",
    authors: "Kadripathi KN, Adolfo Perrusquía, Antonios Tsourdos and Dmitry Ignatyev",
    pdfLink: "/papers/Integrating_explainable_AI_into_two-tier_ML_models-2025.pdf",
    externalLink: "https://arc.aiaa.org/doi/10.2514/6.2025-1928"
  },
  { 
    title: "Advancing Fault Diagnosis in Aircraft Landing Gear: An innovative two-tier Machine Learning Approach with intelligent sensor data management", 
    journal: "AIAA, January 2024",
    authors: "Kadripathi KN, Dmitry Ignatyev, Antonios Tsourdos and Adolfo Perrusquia",
    pdfLink: "/papers/Advancing_fault_diagnosis_in_aircraft_landing_gear-2024.pdf",
    externalLink: "https://arc.aiaa.org/doi/10.2514/6.2024-0759"
  },
  { 
    title: "Real-time Fault Diagnosis in Aircraft Landing Gear: An Advanced Two-Tier AI-driven Model",
    journal: "Master's Research Thesis",
    authors: "Kadripathi KN",
    pdfLink: "/papers/Masters_Thesis.pdf", // Assumed filename from your image
    externalLink: null
  },
  { 
    title: "Performance study of electrohydrodynamic thruster under the influence of external magnetic fields", 
    journal: "IEEE, December 2021",
    authors: "Kadripathi KN, et al.",
    pdfLink: "/papers/Performancestudyofelectrohydrodynamicthruster1%20(1).pdf",
    externalLink: "https://ieeexplore.ieee.org/abstract/document/9622665"
  },
  { 
    title: "De-Authentication Attacks on Rogue UAVs", 
    journal: "IEEE, March 2020",
    authors: "Kadripathi KN, et al.",
    pdfLink: "/papers/De-Authentication_Attacks_on_Rogue_UAVs.pdf",
    externalLink: "https://ieeexplore.ieee.org/document/9316032"
  },
  { 
    title: "An Innovative Technique for Optimization of Efficiency of Transformer and Inductor", 
    journal: "IJRTE, July 2019",
    authors: "Kadripathi KN, et al.",
    pdfLink: "/papers/An%20Innovative%20Technique%20for%20Optimization.pdf",
    externalLink: "https://www.ijrte.org/portfolio-item/b1581078219/"
  },
  { 
    title: "An Innovative Device to Monitor Material Quality using Magnetic Permeability", 
    journal: "IJRTE, 2018",
    authors: "Kadripathi KN, et al.",
    pdfLink: "/papers/An%20Innovative%20Device%20to%20Monitor%20Material.pdf",
    externalLink: "https://www.ijrte.org/portfolio-item/f8747038620/"
  },
  { 
    title: "Railway Track Crack and Obstacle Detector", 
    journal: "IJARTET, March 2018",
    authors: "Kadripathi KN, et al.",
    pdfLink: "/papers/Railway%20Track%20Crack%20and%20Obstacle%20Detector.pdf",
    externalLink: "https://www.researchgate.net/publication/336511203_Railway_Track_Crack_and_Obstacle_Detector_Reports_the_continuity_of_Railway_Track_and_ranges_the_crack"
  }
];

// Add other data exports below as needed
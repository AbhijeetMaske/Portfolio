
export interface ProjectModule {
  name: string;
  purpose: string;
  features: string[];
  outcome: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  result: string;
  image: string;
  tags: string[];
  date?: string;
  role?: string;
  teamSize?: string;
  link?: string;
  keyResponsibilities?: string[];
  features?: string[];
  client?: string;
  modules?: ProjectModule[];
  outcome?: string;
  // Extended Case Study Fields
  businessProblem?: string;
  productChallenge?: string;
  usersPersonas?: string[];
  constraints?: string[];
  productStrategy?: string;
  prioritization?: string;
  technicalArchitecture?: string;
  stakeholders?: string[];
  executionMethodology?: string;
  lessonsLearned?: string[];
  recruiterTakeaway?: string;
  seoKeywords?: string[];
  visualsSuggestion?: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD or undefined for 'Present'
  period: string;     // Fallback text
  description: string[];
  skills?: string[];
  location?: string;
  awards?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
  logoUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Skill {
  name: string;
  endorsedCount: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  duration: 15 | 30 | 60;
  description: string;
  isPopular?: boolean;
}

export type NodeTier = 1 | 2 | 3;

export interface Mandate {
  client: string;
  focus: string;
  duration: string;
}

export interface Publication {
  title: string;
  publisher: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  industry: string;
  subSector?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  inPersonRate?: number;
  imageUrl: string;
  specialties: string[];
  description: string;
  isOnline?: boolean;
  offersInPerson?: boolean;
  preferredHubs?: string[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  packages: PricingPackage[];
  tier?: NodeTier;
  currentMandates?: Mandate[];
  heritage?: string[];
  availabilityStatus?: 'Available' | 'High Demand' | 'Waitlist';
  // New Dossier Elements
  languages: string[];
  regionalExpertise: string[];
  securityClearance?: string;
  ir35Status?: 'Inside' | 'Outside' | 'Determined per Engagement';
  hmrcVerified: boolean;
  techStack: string[];
  publications: Publication[];
  certifications: Certification[];
  pastClients: string[];
  awards: string[];
  affiliations: string[];
  avgResponseTime: string;
  totalClientHours: number;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  subSectors: string[];
}

export type UserRole = 'USER' | 'CONSULTANT' | null;

export enum ViewState {
  LANDING = 'LANDING',
  HOME = 'HOME',
  BROWSE = 'BROWSE',
  EXPERT_PROFILE = 'EXPERT_PROFILE',
  AI_MATCH = 'AI_MATCH',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  FOR_CLIENTS = 'FOR_CLIENTS',
  FOR_CONSULTANTS = 'FOR_CONSULTANTS',
  LOGIN = 'LOGIN',
  DASHBOARD_USER = 'DASHBOARD_USER',
  DASHBOARD_CONSULTANT = 'DASHBOARD_CONSULTANT',
  VIDEO_CALL = 'VIDEO_CALL',
  SECURITY = 'SECURITY',
  PRICING = 'PRICING',
  FAQ = 'FAQ',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  ARBITRATION = 'ARBITRATION',
  HMRC = 'HMRC',
  NODE_MONITOR = 'NODE_MONITOR',
  COMPLIANCE_INDEX = 'COMPLIANCE_INDEX',
  AUDIT_LOG = 'AUDIT_LOG'
}

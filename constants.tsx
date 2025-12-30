
import React from 'react';
import { Expert, Industry, Experience, Education, Skill, PricingPackage, NodeTier, Mandate } from './types';
import { 
  Briefcase, 
  Cpu, 
  Scale, 
  Leaf, 
  TrendingUp, 
  BarChart3, 
  Globe, 
  ShieldCheck,
  Building2,
  Stethoscope,
  Clapperboard,
  Users,
  Truck,
  Zap,
  Hotel,
  GraduationCap,
  PenTool,
  Rocket,
  ShieldAlert,
  Lock,
  Wind,
  Film,
  Plane,
  Coins
} from 'lucide-react';

export const INDUSTRIES: Industry[] = [
  { id: 'cyber', title: 'Cyber & Security', description: 'Zero-trust architecture and sovereign encryption.', icon: 'ShieldAlert', subSectors: ['Zero Trust', 'Incident Response', 'Cloud Security', 'Threat Intel', 'Compliance'] },
  { id: 'finance', title: 'Finance & Fintech', description: 'Navigate City regulations and complex scaling.', icon: 'Coins', subSectors: ['M&A', 'Fintech Scaling', 'FCA Compliance', 'DeFi', 'Wealth Tech'] },
  { id: 'ai', title: 'AI & Digital Transformation', description: 'Implement AI workflows that actually work.', icon: 'Cpu', subSectors: ['LLM Ops', 'Computer Vision', 'Data Strategy', 'Process Automation', 'Cloud Native'] },
  { id: 'legal', title: 'Legal & Compliance', description: 'Quick checks on UK employment or contract law.', icon: 'Scale', subSectors: ['Employment Law', 'Contract Logic', 'GDPR L3', 'IP Strategy', 'Corporate Gov'] },
  { id: 'aerospace', title: 'Aerospace & Defense', description: 'Next-gen defense and satellite infrastructure.', icon: 'Plane', subSectors: ['Space Tech', 'Defense Logic', 'Drone Systems', 'Avionics', 'Materials R&D'] },
  { id: 'energy', title: 'Energy & Utilities', description: 'Strategic grid transition and renewables.', icon: 'Zap', subSectors: ['Renewables', 'Grid Logic', 'Nuclear', 'Hydro-Power', 'Carbon Capture'] },
  { id: 'media', title: 'Media & Entertainment', description: 'IP strategy for the digital content age.', icon: 'Film', subSectors: ['Streaming Ops', 'Content IP', 'Broadcast Tech', 'VFX Pipeline', 'Gaming'] },
  { id: 'creative', title: 'Creative & Brand', description: 'High-end branding for million-dollar visions.', icon: 'PenTool', subSectors: ['Luxury Branding', 'UX Strategy', 'Creative Direction', 'Motion Design', 'Typography'] },
  { id: 'hr', title: 'HR & Cultural Architecture', description: 'Designing high-performance scale-up culture.', icon: 'Users', subSectors: ['Talent Ops', 'Culture Design', 'L&D Strategy', 'Remote Infrastructure', 'DEI Protocol'] },
  { id: 'engineering', title: 'Engineering & R&D', description: 'Industrial hardware and deep-tech scaling.', icon: 'Rocket', subSectors: ['Robotics', 'Precision Eng', 'Semiconductors', 'Applied Physics', 'Biochemical'] },
  { id: 'sustainability', title: 'Sustainability (ESG)', description: 'Meet London’s new green reporting standards.', icon: 'Leaf', subSectors: ['ESG Audit', 'Circular Economy', 'Green Finance', 'Impact Strategy', 'Supply Decarb'] },
  { id: 'property', title: 'Property & PropTech', description: 'Real estate evolution in the capital.', icon: 'Building2', subSectors: ['Commercial Real Estate', 'Asset Management', 'Smart Buildings', 'Property Dev', 'Zoning Logic'] },
  { id: 'health', title: 'Health & Biotech', description: 'Scaling health innovation and NHS integrations.', icon: 'Stethoscope', subSectors: ['Bio-Informatics', 'Health Ops', 'NHS Integration', 'Pharma Supply', 'Clinical Trials'] },
  { id: 'hospitality', title: 'Hospitality & Luxury', description: 'Experience design for premium London markets.', icon: 'Hotel', subSectors: ['Luxury Travel', 'Concierge Ops', 'Fine Dining Strategy', 'Club Membership', 'Event Tech'] },
  { id: 'marketing', title: 'Marketing & Strategy', description: 'Growth hacking for competitive landscapes.', icon: 'TrendingUp', subSectors: ['Growth Hacking', 'Market Entry', 'Performance Marketing', 'MarTech', 'Analytics'] },
  { id: 'logistics', title: 'Supply Chain & Logistics', description: 'Optimizing the mega-city supply chain.', icon: 'Truck', subSectors: ['Last Mile', 'Warehouse AI', 'Fleet Ops', 'Global Shipping', 'Inventory Logic'] }
];

const portraitIds = [
  '1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1544005313-94ddf0286df2',
  '1566492031213-95bd8077e61c', '1506794778202-cad84cf45f1d', '1531123897727-8f129e1688ce', '1506919258185-60717b5f24b0',
  '1589156280159-27698a70f29e', '1554151228-14d9def656e4', '1519085360753-af0119f7cbe7', '1494790108377-be9c29b29330',
  '1562788513-f832d6b8e3e9', '1539571696357-5a69c17a67c6', '1524504388940-b1c1722653e1', '1508214751196-bcfd4ca60f91',
  '1517841905240-472988babdf9', '1531427186611-ecfd6d936c79', '1487412720507-e7ab37603c6f', '1472099645785-5658abf4ff4e',
  '1501196354995-cbb51c65aaea', '1535525154822-fe720240e8f0', '1548142813-f1122c4d87f9', '1504257432384-8e3c1d41dad2',
  '1520813792240-a88d4c954001', '1519345182560-3f2917c472ef', '1463453091185-61582044d556', '1527352723403-c4b024b2b248',
  '1527980965255-d3b416303d12', '1517070208541-6ddc4d3ca3ca', '1491349174775-45eaa14550f7', '1530268729831-45596597117a',
  '1560250097-0b93528c311a', '1537363664315-4497467355f0', '1584997159889-8bb96d0d2217', '1554774853-aae0a22c8aa4',
  '1522075469751-3a6694fb2f61', '1438761681033-6461ffad8d80', '1506863530036-1efeddceb993', '1552058544-f2b08422138a',
  '1564564244660-5d71c4c96ea7', '1500917293891-db833a0d99b2', '1508243301023-c618b40a38b1', '1492562080023-ab3db95bfbce',
  '1559839734-2b71ea197ec2', '1542909168-82c3e7fdca5c', '1573496359142-b8d87734a5a2'
];

const generateExperts = (): Expert[] => {
  const experts: Expert[] = [];
  const firstNames = ['Gemma', 'Helena', 'Darius', 'Sofia', 'Marcus', 'Elena', 'Julian', 'Sophie', 'Thomas', 'Zara', 'Sebastian', 'Isabella', 'Xavier', 'Lucia', 'Hugo', 'Freya', 'Oliver', 'Amelie', 'Arthur', 'Maya', 'Benedict', 'Clara', 'Dominic', 'Elara', 'Felix', 'Alistair', 'Hamish', 'Iris', 'Jasper', 'Kira', 'Leo', 'Mia', 'Nathan', 'Olivia', 'Paul', 'Quinn', 'Rose', 'Silas', 'Talia', 'Ursula'];
  const lastNames = ['Norris', 'Sterling', 'Vance', 'Thorne', 'Castillo', 'Vane', 'Rossi', 'Beaumont', 'Girard', 'Wright', 'Ahmed', 'Blackwood', 'Sinclair', 'Holloway', 'Moretti', 'Chen', 'Okoro', 'Dubois', 'Santoro', 'Fletcher', 'Mendoza', 'Barrington', 'Coulson', 'Davenport', 'Ellington', 'Fairfax', 'Guthrie', 'Harrington', 'Iversen', 'Joplin', 'Kingsley', 'Lawson', 'Maxwell', 'Orton', 'Pritchard', 'Quarry', 'Rigby', 'Sutton', 'Tait', 'Vaughan'];
  
  const allHubs = ['Mayfair Node', 'The City Hub', 'Shoreditch Labs', 'Canary Wharf Node', 'Westminster Node'];
  const companies = ['Goldman Sachs', 'BlackRock', 'DeepMind', 'Clifford Chance', 'HSBC', 'Deliveroo', 'Revolut', 'McKinsey', 'Bain & Co', 'Google London'];

  const advisorCounts = [10, 12, 14, 16];
  let globalIdx = 0;

  INDUSTRIES.forEach((industry) => {
    const count = advisorCounts[Math.floor(Math.random() * advisorCounts.length)];
    
    for (let i = 0; i < count; i++) {
      const id = `${industry.id}-${i}`;
      const firstName = firstNames[globalIdx % firstNames.length];
      const lastName = lastNames[globalIdx % lastNames.length];
      const name = `${firstName} ${lastName}`;
      const portraitId = portraitIds[globalIdx % portraitIds.length];
      const imgUrl = `https://images.unsplash.com/photo-${portraitId}?auto=format&fit=crop&q=80&w=800`;
      
      const subSector = industry.subSectors[i % industry.subSectors.length];

      let baseHourly = 150;
      let tier: NodeTier = 3;
      
      if (i === 0) {
        baseHourly = 1000 + (Math.floor(Math.random() * 200)); 
        tier = 1;
      } else if (i < 5) {
        baseHourly = 500 + (Math.floor(Math.random() * 300)); 
        tier = 2;
      } else {
        baseHourly = 150 + (Math.floor(Math.random() * 250)); 
        tier = 3;
      }

      const seniorityPrefix = tier === 1 ? 'Principal' : tier === 2 ? 'Lead' : 'Advisor';

      const experience: Experience[] = [
        { 
          role: `${seniorityPrefix} Node, ${industry.title}`, 
          company: 'Registry Independent Consultancy', 
          period: '2022 - Present', 
          desc: 'High-fidelity fractional leadership for London scale-ups. Directing L3-compliant strategic initiatives and neural workforce transformations.' 
        },
        { 
          role: `Head of ${industry.title}`, 
          company: companies[globalIdx % companies.length], 
          period: '2018 - 2022', 
          desc: `Engineered vertical scaling for $1B+ institutional portfolios. Managed cross-functional squads for global deployment.` 
        }
      ];

      const skills: Skill[] = [
        { name: subSector, endorsedCount: 215 + Math.floor(Math.random() * 50) },
        { name: 'Sovereign Strategy', endorsedCount: 142 + Math.floor(Math.random() * 30) },
        { name: 'Node Governance', endorsedCount: 88 + Math.floor(Math.random() * 20) }
      ];

      experts.push({
        id,
        name,
        title: `${seniorityPrefix} Node: ${industry.title}`,
        industry: industry.title,
        subSector,
        rating: 4.8 + (Math.random() * 0.19),
        reviewCount: 45 + Math.floor(Math.random() * 300),
        hourlyRate: baseHourly,
        inPersonRate: Math.round(baseHourly * 1.4),
        tier,
        imageUrl: imgUrl,
        specialties: [subSector, 'L3 Governance', 'City Ops', 'Capital Deployment', 'Zero-Trust Protocol'],
        description: `Specialized intelligence consultant with a ${globalIdx + 5}-year track record in ${industry.title}. Vetted for surgical precision in fractional executive roles within London's Tier-1 infrastructure. Extensive background in managing multi-node strategic deployments for stealth-phase scale-ups.`,
        isOnline: Math.random() > 0.4,
        offersInPerson: true, 
        preferredHubs: [...allHubs].sort(() => 0.5 - Math.random()).slice(0, 2),
        experience,
        education: [
           { institution: 'Imperial College London', degree: 'MSc Computational Logic', year: '2012' },
           { institution: 'University of Oxford', degree: 'BA Philosophy, Politics and Economics', year: '2010' }
        ],
        skills,
        packages: [
          { id: `${id}-p1`, name: 'Tactical Sync', duration: 15, description: 'Rapid problem-solving for specific operational hurdles.' },
          { id: `${id}-p2`, name: 'Architecture Review', duration: 30, description: 'Deep-dive into technical or strategic nodes.', isPopular: true }
        ],
        availabilityStatus: Math.random() > 0.7 ? 'High Demand' : 'Available',
        // Expanded Dossier Data
        languages: ['English (Native)', 'French (Professional)', 'Mandarin (Basic)'],
        regionalExpertise: ['EMEA Markets', 'Silicon Roundabout', 'North American Expansion'],
        securityClearance: tier === 1 ? 'DV Cleared' : 'SC Cleared',
        ir35Status: 'Outside',
        hmrcVerified: true,
        techStack: ['Python', 'LLM-Ops', 'AWS Sovereign Cloud', 'Stripe Connect', 'Bloomberg Terminal'],
        publications: [
          { title: 'The Future of Sovereign Digital Nodes', publisher: 'City Intelligence Journal', year: '2023' },
          { title: 'Fractional Leadership in Web3', publisher: 'London Business Review', year: '2022' }
        ],
        certifications: [
          { name: 'PRINCE2 Agile Practitioner', issuer: 'AXELOS' },
          { name: 'Certified Information Systems Security Professional', issuer: 'ISC2' }
        ],
        pastClients: [companies[globalIdx % companies.length], companies[(globalIdx + 1) % companies.length], 'Stealth Startup X', 'HM Treasury (Advisory)'],
        awards: ['Financial Times 30 Under 30 (Advisory)', 'City of London Innovation Award 2023'],
        affiliations: ['Royal Society of Arts (Fellow)', 'Institute of Directors (Member)'],
        avgResponseTime: '< 12 Minutes',
        totalClientHours: 1200 + Math.floor(Math.random() * 5000)
      });
      
      globalIdx++;
    }
  });

  return experts.sort(() => Math.random() - 0.5);
};

export const EXPERTS: Expert[] = generateExperts();

export const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert size={20} />,
  Coins: <Coins size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Cpu: <Cpu size={20} />,
  Scale: <Scale size={20} />,
  Leaf: <Leaf size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Briefcase: <Briefcase size={20} />,
  Globe: <Globe size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Building2: <Building2 size={20} />,
  Stethoscope: <Stethoscope size={20} />,
  Clapperboard: <Clapperboard size={20} />,
  Users: <Users size={20} />,
  Truck: <Truck size={20} />,
  Zap: <Zap size={20} />,
  Hotel: <Hotel size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  PenTool: <PenTool size={20} />,
  Rocket: <Rocket size={20} />,
  Lock: <Lock size={20} />,
  Plane: <Plane size={20} />,
  Film: <Film size={20} />,
  Wind: <Wind size={20} />
};

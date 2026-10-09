export type PageView =
  | 'landing'
  | 'intro'
  | 'auth'
  | 'checkin'
  | 'assessment'
  | 'hub'
  | 'insights'
  | 'goal'
  | 'plan'
  | 'studio'
  | 'learning'
  | 'wellbeing'
  | 'progress'
  | 'staff'
  | 'admin'
  | 'safeguarding';

export type UserRole = 'fellow' | 'staff' | 'admin' | 'safeguarding';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isApproved: boolean;
  isDemo?: boolean;
  cohort?: string;
  createdAt: string;
}

export interface ParticipantProfile {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  stage: 'Final Year Student' | 'National Service / Gap Year' | 'Recent Graduate' | 'Career Transitioner' | 'Aspiring Founder';
  educationContext: string;
  primaryGoal: string;
  successDefinition: string;
  timeframe: string;
  energyLevel: number; // 1 to 5
  confidenceLevel: number; // 1 to 5
  topBarriers: string[];
  supportRequested: boolean;
  supportNote?: string;
  cohort: string;
  baselineCompleted?: boolean;
}

export interface CheckInResponses {
  currentStage: string;
  fieldOfStudyOrWork: string;
  hopedDirection: string;
  clarityScore: number; // 1-5
  biggestUncertainty: string;
  existingStrengths: string[];
  readinessNeeds: string[];
  energyLevel: number; // 1-5
  confidenceLevel: number; // 1-5
  frictionFactors: string[];
  supportPreference: 'independent' | 'peer' | 'staff_checkin';
}

export interface OpportunityItem {
  id: string;
  userId?: string;
  name: string;
  organization: string;
  link?: string;
  deadline?: string;
  type: 'Job' | 'Internship' | 'Traineeship' | 'Fellowship' | 'Freelance' | 'Grant';
  status: 'Interested' | 'Preparing' | 'Applied' | 'Interview / Next Stage' | 'Successful' | 'Not Successful' | 'Withdrawn';
  nextAction?: string;
  followUpDate?: string;
  notes?: string;
  outcome?: string;
  createdAt: string;
}

export interface SupportRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'Academic & Career' | 'Connectivity & Electricity' | 'Personal Wellbeing & Pace' | 'Technical & Project Help' | 'Confidential Safeguarding';
  message: string;
  urgency: 'Normal' | 'Urgent';
  status: 'Pending' | 'In Review' | 'Resolved';
  assignedTo?: string;
  staffNotes?: string;
  createdAt: string;
  isSafeguarding?: boolean;
}

export interface WeeklyLearningLesson {
  id: string;
  weekNumber: number;
  stage: 'Stabilise' | 'Decentre' | 'Equip' | 'Act';
  title: string;
  description: string;
  durationMinutes: number;
  googleDriveLink?: string;
  resourceLinks?: { label: string; url: string }[];
  assignmentTask?: string;
  deadline?: string;
  isUnlocked: boolean;
  isPublished: boolean;
  releaseDate?: string;
  completed?: boolean;
}

export interface AiPathwayInsight {
  themeTitle: string;
  currentFocus: string;
  readyAssets: string[];
  growthAreas: string[];
  suggestedNextMove: string;
  disclaimer: string;
}

export interface PlanAction {
  id: string;
  title: string;
  category: 'Portfolio & Work' | 'Outreach & Network' | 'Applications' | 'Skill Readiness' | 'Wellbeing & Reflection';
  targetDate: string;
  deliverable: string;
  helperResource?: string;
  collaboratorOrMentor?: string;
  completed: boolean;
  evidenceNote?: string;
}

export interface OpportunityPlan {
  goal: string;
  readinessFocus: string;
  actions: PlanAction[];
  reviewDate: string;
  status: 'In Progress' | 'On Track' | 'Review Due';
}

export interface LanguageStudioTask {
  id: string;
  type:
    | 'CV Bullet Statement'
    | 'LinkedIn Headline & About'
    | 'Professional Pitch'
    | 'Outreach Email'
    | 'Interview STAR Answer'
    | 'Portfolio Project Narrative';
  promptPlaceholder: string;
  targetAudience: string;
  userInput: string;
  refinedOutput: string;
  whyItWorks: string[];
  keyPrinciple: string;
}

export interface NetworkConnection {
  id: string;
  name: string;
  role: string;
  companyOrOrg: string;
  location: string;
  avatar: string;
  expertise: string[];
  whyConnect: string;
  status: 'recommended' | 'prepared' | 'completed';
  conversationGuide: {
    step: string;
    description: string;
    suggestedQuestion: string;
  }[];
  loggedNotes?: {
    date: string;
    keyTakeaways: string;
    nextAgreedStep: string;
  };
}

export interface LearningModule {
  id: string;
  title: string;
  durationMinutes: number;
  description: string;
  learnContent: string[];
  reflectPrompts: string[];
  practicalTask: string;
  nextStepAction: string;
  completed: boolean;
}

export interface StaffFellowRecord {
  id: string;
  name: string;
  email: string;
  location: string;
  stage: string;
  primaryGoal: string;
  planStatus: 'On Track' | 'Needs Attention' | 'Action Overdue' | 'Review Ready';
  actionsCompleted: number;
  totalActions: number;
  lastCheckInDaysAgo: number;
  supportFlag: 'None' | 'Requested Check-In' | 'Connectivity Block';
  energy: number;
  confidence: number;
  recentActivity: string;
  staffNotes: string;
}

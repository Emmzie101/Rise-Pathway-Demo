import fs from 'fs';
import path from 'path';
import {
  UserAccount,
  ParticipantProfile,
  CheckInResponses,
  OpportunityPlan,
  OpportunityItem,
  SupportRequest,
  WeeklyLearningLesson,
} from '../src/types';
import {
  initialParticipantProfile,
  initialCheckInResponses,
  initialActivationPlan,
  initialOpportunities,
  initialWeeklyLessons,
  initialSupportRequests,
  demoAccounts,
  sampleStaffFellows,
} from '../src/data/mockData';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'app-data.json');

export interface AppDatabase {
  users: UserAccount[];
  fellowProfiles: Record<string, ParticipantProfile>;
  fellowResponses: Record<string, CheckInResponses>;
  fellowPlans: Record<string, OpportunityPlan>;
  fellowOpportunities: Record<string, OpportunityItem[]>;
  lessons: WeeklyLearningLesson[];
  supportRequests: SupportRequest[];
  safeguardingRecords: {
    id: string;
    fellowId: string;
    fellowName: string;
    severity: 'High' | 'Critical';
    confidentialNotes: string;
    actionTaken: string;
    loggedAt: string;
    status: 'Open' | 'Active Support' | 'Resolved';
  }[];
}

const defaultDatabase: AppDatabase = {
  users: demoAccounts.map((d) => ({
    id: d.id,
    email: d.email,
    name: d.name,
    role: d.role,
    avatar: d.avatar,
    isApproved: d.isApproved,
    isDemo: true,
    cohort: 'GBG Cohort 2',
    createdAt: '2026-10-01T00:00:00Z',
  })),
  fellowProfiles: {
    'demo-fellow-kofi': { ...initialParticipantProfile, id: 'demo-fellow-kofi', baselineCompleted: true },
  },
  fellowResponses: {
    'demo-fellow-kofi': { ...initialCheckInResponses },
  },
  fellowPlans: {
    'demo-fellow-kofi': { ...initialActivationPlan },
  },
  fellowOpportunities: {
    'demo-fellow-kofi': [...initialOpportunities],
  },
  lessons: [...initialWeeklyLessons],
  supportRequests: [...initialSupportRequests],
  safeguardingRecords: [
    {
      id: 'sg-01',
      fellowId: 'fel-chidinma',
      fellowName: 'Chidinma Eze',
      severity: 'Critical',
      confidentialNotes: 'Disclosed high domestic distress and unsafe living arrangement. Student requested strict non-disclosure to peers and general cohort.',
      actionTaken: 'Safeguarding lead established direct private line and emergency support contact.',
      loggedAt: '2026-10-07T14:20:00Z',
      status: 'Active Support',
    },
  ],
};

export function getDatabase(): AppDatabase {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultDatabase, null, 2), 'utf-8');
      return defaultDatabase;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database, using fallback in-memory store:', err);
    return defaultDatabase;
  }
}

export function saveDatabase(data: AppDatabase) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

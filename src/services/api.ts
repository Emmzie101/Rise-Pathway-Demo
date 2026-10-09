import {
  UserAccount,
  UserRole,
  ParticipantProfile,
  CheckInResponses,
  OpportunityPlan,
  OpportunityItem,
  SupportRequest,
  WeeklyLearningLesson,
} from '../types';
import {
  initialParticipantProfile,
  initialCheckInResponses,
  initialActivationPlan,
  initialOpportunities,
  initialWeeklyLessons,
  initialSupportRequests,
  demoAccounts,
} from '../data/mockData';

const TOKEN_KEY = 'rise_auth_token';
const ACTIVE_USER_KEY = 'rise_active_user';
const OFFLINE_DB_KEY = 'rise_local_store_v1';

interface LocalStore {
  users: UserAccount[];
  profiles: Record<string, ParticipantProfile>;
  responses: Record<string, CheckInResponses>;
  plans: Record<string, OpportunityPlan>;
  opportunities: Record<string, OpportunityItem[]>;
  lessons: WeeklyLearningLesson[];
  requests: SupportRequest[];
  safeguardingRecords: any[];
}

function getLocalStore(): LocalStore {
  try {
    const raw = localStorage.getItem(OFFLINE_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  const initial: LocalStore = {
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
    profiles: {
      'demo-fellow-kofi': { ...initialParticipantProfile, id: 'demo-fellow-kofi', baselineCompleted: true },
    },
    responses: {
      'demo-fellow-kofi': { ...initialCheckInResponses },
    },
    plans: {
      'demo-fellow-kofi': { ...initialActivationPlan },
    },
    opportunities: {
      'demo-fellow-kofi': [...initialOpportunities],
    },
    lessons: [...initialWeeklyLessons],
    requests: [...initialSupportRequests],
    safeguardingRecords: [
      {
        id: 'sg-01',
        fellowId: 'fel-chidinma',
        fellowName: 'Chidinma Eze',
        severity: 'Critical',
        confidentialNotes: 'Disclosed domestic displacement crisis. Direct focal-person intake opened.',
        actionTaken: 'Emergency assistance hotline and safe study haven stipend coordinated.',
        loggedAt: '2026-10-07T14:20:00Z',
        status: 'Active Support',
      },
    ],
  };
  saveLocalStore(initial);
  return initial;
}

function saveLocalStore(store: LocalStore) {
  try {
    localStorage.setItem(OFFLINE_DB_KEY, JSON.stringify(store));
  } catch (e) {}
}

export function getSessionToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setSessionToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getCachedUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

export function setCachedUser(user: UserAccount | null) {
  if (user) {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(ACTIVE_USER_KEY);
  }
}

// -------------------------------------------------------------
// AUTHENTICATION API
// -------------------------------------------------------------

export async function getCurrentUser(): Promise<UserAccount | null> {
  const token = getSessionToken();
  if (!token) return getCachedUser();

  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        setCachedUser(data.user);
        return data.user;
      }
    }
  } catch (e) {
    // Network fallback
  }

  return getCachedUser();
}

export async function registerUser(params: {
  email: string;
  name: string;
  role: UserRole;
  inviteCode?: string;
  password?: string;
}): Promise<{ user: UserAccount; isApproved: boolean; approvalMessage?: string }> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.token) setSessionToken(data.token);
      if (data.user) setCachedUser(data.user);
      return data;
    }
    const err = await res.json();
    throw new Error(err.error || 'Registration failed');
  } catch (e: any) {
    // Fallback to local store
    const store = getLocalStore();
    const isApproved =
      params.role === 'fellow' ||
      (params.role === 'staff' && params.inviteCode === 'RWEF-STAFF-2026') ||
      (params.role === 'admin' && params.inviteCode === 'RWEF-ADMIN-PASS') ||
      (params.role === 'safeguarding' && params.inviteCode === 'RWEF-SAFEGUARD-CONFIDENTIAL');

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email: params.email.trim().toLowerCase(),
      name: params.name.trim(),
      role: params.role,
      isApproved,
      isDemo: false,
      cohort: 'GBG Cohort 2',
      createdAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    if (params.role === 'fellow') {
      store.profiles[newUser.id] = {
        id: newUser.id,
        name: newUser.name,
        location: 'Accra, Ghana',
        stage: 'Recent Graduate',
        educationContext: '',
        primaryGoal: '',
        successDefinition: '',
        timeframe: '14-Day Sprint',
        energyLevel: 3,
        confidenceLevel: 3,
        topBarriers: [],
        supportRequested: false,
        cohort: 'GBG Cohort 2',
        baselineCompleted: false,
      };
      store.plans[newUser.id] = { ...initialActivationPlan };
      store.opportunities[newUser.id] = [...initialOpportunities];
    }
    saveLocalStore(store);

    const token = `local-tok-${newUser.id}`;
    setSessionToken(token);
    setCachedUser(newUser);

    return {
      user: newUser,
      isApproved,
      approvalMessage: isApproved
        ? undefined
        : `Your registration as ${params.role} is pending administrator verification.`,
    };
  }
}

export async function loginUser(params: {
  email: string;
  password?: string;
}): Promise<UserAccount> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.token) setSessionToken(data.token);
      if (data.user) setCachedUser(data.user);
      return data.user;
    }
    const err = await res.json();
    throw new Error(err.error || 'Login failed');
  } catch (e: any) {
    // Local fallback
    const store = getLocalStore();
    const user = store.users.find(
      (u) => u.email.toLowerCase() === params.email.trim().toLowerCase()
    );
    if (!user) throw new Error('No user found with this email. Please check your spelling or sign up.');
    if (!user.isApproved) throw new Error(`Account pending administrator approval for role ${user.role}.`);

    setSessionToken(`local-tok-${user.id}`);
    setCachedUser(user);
    return user;
  }
}

export async function switchDemoPersona(personaId: string): Promise<UserAccount> {
  try {
    const res = await fetch('/api/auth/demo-switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personaId }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.token) setSessionToken(data.token);
      if (data.user) setCachedUser(data.user);
      return data.user;
    }
  } catch (e) {}

  const demo = demoAccounts.find((d) => d.id === personaId);
  if (!demo) throw new Error('Persona not found');
  const user: UserAccount = {
    id: demo.id,
    name: demo.name,
    email: demo.email,
    role: demo.role,
    avatar: demo.avatar,
    isApproved: true,
    isDemo: true,
    cohort: 'GBG Cohort 2',
    createdAt: '2026-10-01T00:00:00Z',
  };
  setSessionToken(`demo-tok-${demo.id}`);
  setCachedUser(user);
  return user;
}

export function logoutUser() {
  setSessionToken(null);
  setCachedUser(null);
}

// -------------------------------------------------------------
// FELLOW DATA API
// -------------------------------------------------------------

export async function fetchFellowData(userId: string): Promise<{
  profile: ParticipantProfile;
  responses: CheckInResponses | null;
  plan: OpportunityPlan;
  opportunities: OpportunityItem[];
}> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/fellow/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        return {
          profile: data.profile || initialParticipantProfile,
          responses: data.responses,
          plan: data.plan || initialActivationPlan,
          opportunities: data.opportunities || initialOpportunities,
        };
      }
    } catch (e) {}
  }

  const store = getLocalStore();
  const profile = store.profiles[userId] || {
    ...initialParticipantProfile,
    id: userId,
  };
  const responses = store.responses[userId] || null;
  const plan = store.plans[userId] || initialActivationPlan;
  const opportunities = store.opportunities[userId] || initialOpportunities;

  return { profile, responses, plan, opportunities };
}

export async function saveBaselineCheckIn(
  userId: string,
  responses: CheckInResponses,
  profileUpdates: Partial<ParticipantProfile>
): Promise<ParticipantProfile> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/fellow/checkin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ responses, profile: profileUpdates }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.profile;
      }
    } catch (e) {}
  }

  const store = getLocalStore();
  store.responses[userId] = responses;
  const existing = store.profiles[userId] || initialParticipantProfile;
  const updated: ParticipantProfile = {
    ...existing,
    ...profileUpdates,
    id: userId,
    baselineCompleted: true,
  };
  store.profiles[userId] = updated;
  saveLocalStore(store);
  return updated;
}

export async function saveOpportunityPlan(userId: string, plan: OpportunityPlan): Promise<void> {
  const token = getSessionToken();
  if (token) {
    try {
      await fetch('/api/fellow/plan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });
      return;
    } catch (e) {}
  }

  const store = getLocalStore();
  store.plans[userId] = plan;
  saveLocalStore(store);
}

// -------------------------------------------------------------
// OPPORTUNITY TRACKER API
// -------------------------------------------------------------

export async function fetchOpportunities(userId: string): Promise<OpportunityItem[]> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/opportunities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  return store.opportunities[userId] || initialOpportunities;
}

export async function addOpportunity(userId: string, opp: Omit<OpportunityItem, 'id' | 'createdAt'>): Promise<OpportunityItem> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(opp),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  const list = store.opportunities[userId] || [];
  const created: OpportunityItem = {
    ...opp,
    id: `opp-${Date.now()}`,
    userId,
    createdAt: new Date().toISOString(),
  };
  list.unshift(created);
  store.opportunities[userId] = list;
  saveLocalStore(store);
  return created;
}

export async function updateOpportunity(userId: string, id: string, updates: Partial<OpportunityItem>): Promise<OpportunityItem> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch(`/api/opportunities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  const list = store.opportunities[userId] || [];
  const idx = list.findIndex((o) => o.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
    store.opportunities[userId] = list;
    saveLocalStore(store);
    return list[idx];
  }
  throw new Error('Opportunity not found');
}

export async function deleteOpportunity(userId: string, id: string): Promise<void> {
  const token = getSessionToken();
  if (token) {
    try {
      await fetch(`/api/opportunities/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return;
    } catch (e) {}
  }

  const store = getLocalStore();
  store.opportunities[userId] = (store.opportunities[userId] || []).filter((o) => o.id !== id);
  saveLocalStore(store);
}

// -------------------------------------------------------------
// LEARNING LESSONS API
// -------------------------------------------------------------

export async function fetchLessons(): Promise<WeeklyLearningLesson[]> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/learning/lessons', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  return store.lessons;
}

export async function toggleLessonComplete(id: string): Promise<void> {
  const token = getSessionToken();
  if (token) {
    try {
      await fetch(`/api/learning/lessons/${id}/toggle`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return;
    } catch (e) {}
  }

  const store = getLocalStore();
  const l = store.lessons.find((item) => item.id === id);
  if (l) {
    l.completed = !l.completed;
    saveLocalStore(store);
  }
}

export async function saveStaffLesson(lesson: Partial<WeeklyLearningLesson>): Promise<WeeklyLearningLesson> {
  const token = getSessionToken();
  if (token) {
    try {
      const url = lesson.id ? `/api/learning/lessons/${lesson.id}` : '/api/learning/lessons';
      const method = lesson.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lesson),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  if (lesson.id) {
    const idx = store.lessons.findIndex((l) => l.id === lesson.id);
    if (idx !== -1) {
      store.lessons[idx] = { ...store.lessons[idx], ...(lesson as any) };
      saveLocalStore(store);
      return store.lessons[idx];
    }
  }

  const created: WeeklyLearningLesson = {
    id: `lesson-${Date.now()}`,
    weekNumber: lesson.weekNumber || 1,
    stage: lesson.stage || 'Stabilise',
    title: lesson.title || 'New Weekly Lesson',
    description: lesson.description || '',
    durationMinutes: lesson.durationMinutes || 20,
    googleDriveLink: lesson.googleDriveLink || '',
    assignmentTask: lesson.assignmentTask || '',
    deadline: lesson.deadline || 'End of Week',
    isUnlocked: lesson.isUnlocked ?? true,
    isPublished: lesson.isPublished ?? true,
    completed: false,
  };
  store.lessons.push(created);
  saveLocalStore(store);
  return created;
}

// -------------------------------------------------------------
// SUPPORT REQUESTS & SAFEGUARDING API
// -------------------------------------------------------------

export async function sendSupportRequest(params: {
  category: SupportRequest['category'];
  message: string;
  urgency: 'Normal' | 'Urgent';
}): Promise<{ success: boolean; request: SupportRequest }> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/support-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const user = getCachedUser();
  const isSafeguarding = params.category === 'Confidential Safeguarding';
  const newReq: SupportRequest = {
    id: `req-${Date.now()}`,
    userId: user ? user.id : 'guest',
    userName: user ? user.name : 'Fellow Participant',
    userEmail: user ? user.email : 'fellow@rwef.org',
    category: params.category,
    message: params.message,
    urgency: params.urgency,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    isSafeguarding,
  };

  const store = getLocalStore();
  store.requests.unshift(newReq);
  if (isSafeguarding) {
    store.safeguardingRecords.unshift({
      id: `sg-${Date.now()}`,
      fellowId: newReq.userId,
      fellowName: newReq.userName,
      severity: params.urgency === 'Urgent' ? 'Critical' : 'High',
      confidentialNotes: params.message,
      actionTaken: 'Flagged exclusively for Safeguarding Focal Person intake review.',
      loggedAt: new Date().toISOString(),
      status: 'Open',
    });
  }
  saveLocalStore(store);
  return { success: true, request: newReq };
}

export async function fetchSupportRequests(): Promise<SupportRequest[]> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/support-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  const user = getCachedUser();
  if (!user) return [];
  if (user.role === 'fellow') return store.requests.filter((r) => r.userId === user.id);
  if (user.role === 'safeguarding') return store.requests.filter((r) => r.isSafeguarding);
  return store.requests.filter((r) => !r.isSafeguarding);
}

export async function updateSupportRequestStatus(
  id: string,
  status: 'Pending' | 'In Review' | 'Resolved',
  staffNotes?: string
): Promise<void> {
  const token = getSessionToken();
  if (token) {
    try {
      await fetch(`/api/support-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, staffNotes }),
      });
      return;
    } catch (e) {}
  }

  const store = getLocalStore();
  const req = store.requests.find((r) => r.id === id);
  if (req) {
    req.status = status;
    if (staffNotes !== undefined) req.staffNotes = staffNotes;
    saveLocalStore(store);
  }
}

export async function fetchSafeguardingRecords(): Promise<any[]> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/safeguarding/records', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  return store.safeguardingRecords;
}

// -------------------------------------------------------------
// ADMIN USERS API
// -------------------------------------------------------------

export async function fetchAdminUsers(): Promise<UserAccount[]> {
  const token = getSessionToken();
  if (token) {
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return await res.json();
    } catch (e) {}
  }

  const store = getLocalStore();
  return store.users;
}

export async function approveUserAccess(id: string): Promise<void> {
  const token = getSessionToken();
  if (token) {
    try {
      await fetch(`/api/admin/users/${id}/approve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      return;
    } catch (e) {}
  }

  const store = getLocalStore();
  const u = store.users.find((item) => item.id === id);
  if (u) {
    u.isApproved = true;
    saveLocalStore(store);
  }
}

export async function changeUserRole(id: string, newRole: UserRole): Promise<void> {
  const token = getSessionToken();
  if (token) {
    try {
      await fetch(`/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newRole }),
      });
      return;
    } catch (e) {}
  }

  const store = getLocalStore();
  const u = store.users.find((item) => item.id === id);
  if (u) {
    u.role = newRole;
    u.isApproved = true;
    saveLocalStore(store);
  }
}

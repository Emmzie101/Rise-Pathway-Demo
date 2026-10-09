import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { getDatabase, saveDatabase } from './server/store';
import { UserRole } from './src/types';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Security Codes for protected role bootstrapping/authorization
const STAFF_INVITE_CODE = process.env.STAFF_INVITE_CODE || 'RWEF-STAFF-2026';
const ADMIN_INVITE_CODE = process.env.ADMIN_INVITE_CODE || 'RWEF-ADMIN-PASS';
const SAFEGUARD_INVITE_CODE = process.env.SAFEGUARD_INVITE_CODE || 'RWEF-SAFEGUARD-CONFIDENTIAL';

// In-memory active session token store
const sessions: Record<string, { userId: string; role: UserRole }> = {
  'demo-token-kofi': { userId: 'demo-fellow-kofi', role: 'fellow' },
};

function getAuthUser(req: express.Request) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '') || (req.headers['x-session-token'] as string);
  if (!token || !sessions[token]) return null;
  const session = sessions[token];
  const db = getDatabase();
  const user = db.users.find((u) => u.id === session.userId);
  return user || null;
}

// -------------------------------------------------------------
// AUTHENTICATION & ACCESS CONTROL ENDPOINTS
// -------------------------------------------------------------

app.get('/api/auth/me', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(200).json({ user: null });
  }
  return res.json({ user });
});

app.post('/api/auth/register', (req, res) => {
  const { email, name, role, inviteCode, password } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const db = getDatabase();
  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const targetRole: UserRole = ['fellow', 'staff', 'admin', 'safeguarding'].includes(role)
    ? role
    : 'fellow';

  // SECURITY ENFORCEMENT: Staff, Admin, and Safeguarding roles require verified approval
  let isApproved = false;
  let approvalMessage = '';

  if (targetRole === 'fellow') {
    isApproved = true;
  } else if (targetRole === 'staff') {
    if (inviteCode === STAFF_INVITE_CODE) {
      isApproved = true;
    } else {
      isApproved = false;
      approvalMessage =
        'Your staff account has been registered but is pending administrator approval. An authorized administrator must review and activate your access before you can view cohort data.';
    }
  } else if (targetRole === 'admin') {
    if (inviteCode === ADMIN_INVITE_CODE) {
      isApproved = true;
    } else {
      isApproved = false;
      approvalMessage =
        'Administrator role registration requires verified authorization. Your account is pending review by the R-WEF Governance Lead.';
    }
  } else if (targetRole === 'safeguarding') {
    if (inviteCode === SAFEGUARD_INVITE_CODE) {
      isApproved = true;
    } else {
      isApproved = false;
      approvalMessage =
        'Safeguarding Focal Person access is strictly protected. Your account is logged and requires explicit administrative clearance.';
    }
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim().toLowerCase(),
    name: name.trim(),
    role: targetRole,
    isApproved,
    isDemo: false,
    cohort: 'GBG Cohort 2',
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);

  // Initialize empty records for fellow
  if (targetRole === 'fellow') {
    db.fellowProfiles[newUser.id] = {
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
  }

  saveDatabase(db);

  const token = `tok-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  sessions[token] = { userId: newUser.id, role: newUser.role };

  return res.json({
    user: newUser,
    token,
    isApproved,
    approvalMessage,
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const db = getDatabase();
  const user = db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'No account found with this email address' });
  }

  if (!user.isApproved) {
    return res.status(403).json({
      error: `Account pending authorization. Your role as ${user.role} has not yet been approved by an administrator.`,
      user,
    });
  }

  const token = `tok-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  sessions[token] = { userId: user.id, role: user.role };

  return res.json({ user, token });
});

app.post('/api/auth/demo-switch', (req, res) => {
  const { personaId } = req.body;
  const db = getDatabase();
  const user = db.users.find((u) => u.id === personaId);
  if (!user) {
    return res.status(404).json({ error: 'Demo persona not found' });
  }

  const token = `demo-tok-${user.id}`;
  sessions[token] = { userId: user.id, role: user.role };

  return res.json({ user, token });
});

// -------------------------------------------------------------
// FELLOW DATA PERSISTENCE ENDPOINTS
// -------------------------------------------------------------

app.get('/api/fellow/me', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const db = getDatabase();
  const profile = db.fellowProfiles[user.id] || {
    id: user.id,
    name: user.name,
    location: 'West Africa',
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
  const responses = db.fellowResponses[user.id] || null;
  const plan = db.fellowPlans[user.id] || null;
  const opportunities = db.fellowOpportunities[user.id] || [];

  return res.json({ profile, responses, plan, opportunities });
});

app.put('/api/fellow/checkin', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { responses, profile } = req.body;
  const db = getDatabase();

  db.fellowResponses[user.id] = responses;
  db.fellowProfiles[user.id] = {
    ...(db.fellowProfiles[user.id] || {}),
    ...profile,
    id: user.id,
    baselineCompleted: true,
  };

  saveDatabase(db);
  return res.json({ success: true, profile: db.fellowProfiles[user.id] });
});

app.put('/api/fellow/plan', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { plan } = req.body;
  const db = getDatabase();
  db.fellowPlans[user.id] = plan;
  saveDatabase(db);
  return res.json({ success: true, plan });
});

// -------------------------------------------------------------
// OPPORTUNITIES TRACKER ENDPOINTS
// -------------------------------------------------------------

app.get('/api/opportunities', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const db = getDatabase();
  const list = db.fellowOpportunities[user.id] || [];
  return res.json(list);
});

app.post('/api/opportunities', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const item = req.body;
  const db = getDatabase();
  const userOpps = db.fellowOpportunities[user.id] || [];
  const newOpp = {
    ...item,
    id: item.id || `opp-${Date.now()}`,
    userId: user.id,
    createdAt: new Date().toISOString(),
  };
  userOpps.unshift(newOpp);
  db.fellowOpportunities[user.id] = userOpps;
  saveDatabase(db);
  return res.json(newOpp);
});

app.put('/api/opportunities/:id', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.params;
  const update = req.body;
  const db = getDatabase();
  const userOpps = db.fellowOpportunities[user.id] || [];
  const index = userOpps.findIndex((o) => o.id === id);
  if (index === -1) return res.status(404).json({ error: 'Opportunity not found' });

  userOpps[index] = { ...userOpps[index], ...update };
  db.fellowOpportunities[user.id] = userOpps;
  saveDatabase(db);
  return res.json(userOpps[index]);
});

app.delete('/api/opportunities/:id', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.params;
  const db = getDatabase();
  const userOpps = db.fellowOpportunities[user.id] || [];
  db.fellowOpportunities[user.id] = userOpps.filter((o) => o.id !== id);
  saveDatabase(db);
  return res.json({ success: true });
});

// -------------------------------------------------------------
// LEARNING LESSONS ENDPOINTS
// -------------------------------------------------------------

app.get('/api/learning/lessons', (req, res) => {
  const user = getAuthUser(req);
  const db = getDatabase();
  // Fellows only see published lessons; staff and admins see drafts too
  if (user && (user.role === 'staff' || user.role === 'admin')) {
    return res.json(db.lessons);
  }
  const published = db.lessons.filter((l) => l.isPublished);
  return res.json(published);
});

app.post('/api/learning/lessons', (req, res) => {
  const user = getAuthUser(req);
  if (!user || (user.role !== 'staff' && user.role !== 'admin')) {
    return res.status(403).json({ error: 'Only staff and administrators can manage learning content' });
  }

  const lesson = req.body;
  const db = getDatabase();
  const newLesson = {
    ...lesson,
    id: lesson.id || `lesson-${Date.now()}`,
  };
  db.lessons.push(newLesson);
  saveDatabase(db);
  return res.json(newLesson);
});

app.put('/api/learning/lessons/:id', (req, res) => {
  const user = getAuthUser(req);
  if (!user || (user.role !== 'staff' && user.role !== 'admin')) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;
  const update = req.body;
  const db = getDatabase();
  const index = db.lessons.findIndex((l) => l.id === id);
  if (index === -1) return res.status(404).json({ error: 'Lesson not found' });

  db.lessons[index] = { ...db.lessons[index], ...update };
  saveDatabase(db);
  return res.json(db.lessons[index]);
});

app.post('/api/learning/lessons/:id/toggle', (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  const lesson = db.lessons.find((l) => l.id === id);
  if (lesson) {
    lesson.completed = !lesson.completed;
    saveDatabase(db);
  }
  return res.json({ success: true, lesson });
});

// -------------------------------------------------------------
// SUPPORT REQUESTS & SAFEGUARDING SEPARATION
// -------------------------------------------------------------

app.post('/api/support-requests', (req, res) => {
  const user = getAuthUser(req);
  const { category, message, urgency } = req.body;
  const isSafeguarding = category === 'Confidential Safeguarding';

  const db = getDatabase();
  const newReq = {
    id: `req-${Date.now()}`,
    userId: user ? user.id : `guest-${Date.now()}`,
    userName: user ? user.name : 'Fellow Participant',
    userEmail: user ? user.email : 'fellow@rwef.org',
    category,
    message,
    urgency: urgency || 'Normal',
    status: 'Pending' as const,
    createdAt: new Date().toISOString(),
    isSafeguarding,
  };

  db.supportRequests.unshift(newReq);

  // If safeguarding, add strict dossier record
  if (isSafeguarding) {
    db.safeguardingRecords.unshift({
      id: `sg-${Date.now()}`,
      fellowId: newReq.userId,
      fellowName: newReq.userName,
      severity: urgency === 'Urgent' ? 'Critical' : 'High',
      confidentialNotes: message,
      actionTaken: 'Flagged exclusively for Safeguarding Focal Person intake review.',
      loggedAt: new Date().toISOString(),
      status: 'Open',
    });
  }

  saveDatabase(db);
  return res.json({ success: true, request: newReq });
});

app.get('/api/support-requests', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDatabase();

  // STRICT PRIVACY SEPARATION:
  if (user.role === 'fellow') {
    return res.json(db.supportRequests.filter((r) => r.userId === user.id));
  }
  if (user.role === 'safeguarding') {
    // Safeguarding focal person sees safeguarding requests
    return res.json(db.supportRequests.filter((r) => r.isSafeguarding));
  }
  if (user.role === 'staff' || user.role === 'admin') {
    // Ordinary staff and admins do NOT see confidential safeguarding notes
    return res.json(db.supportRequests.filter((r) => !r.isSafeguarding));
  }

  return res.json([]);
});

app.put('/api/support-requests/:id', (req, res) => {
  const user = getAuthUser(req);
  if (!user || user.role === 'fellow') {
    return res.status(403).json({ error: 'Unauthorized to update support requests' });
  }

  const { id } = req.params;
  const { status, staffNotes } = req.body;
  const db = getDatabase();
  const index = db.supportRequests.findIndex((r) => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Request not found' });

  db.supportRequests[index] = {
    ...db.supportRequests[index],
    status: status || db.supportRequests[index].status,
    staffNotes: staffNotes !== undefined ? staffNotes : db.supportRequests[index].staffNotes,
    assignedTo: user.name,
  };

  saveDatabase(db);
  return res.json(db.supportRequests[index]);
});

// Safeguarding Desk - strictly accessible by role === 'safeguarding'
app.get('/api/safeguarding/records', (req, res) => {
  const user = getAuthUser(req);
  if (!user || user.role !== 'safeguarding') {
    return res.status(403).json({ error: 'Access denied: Strictly restricted to Safeguarding Focal Person' });
  }

  const db = getDatabase();
  return res.json(db.safeguardingRecords);
});

// -------------------------------------------------------------
// ADMINISTRATOR USER MANAGEMENT
// -------------------------------------------------------------

app.get('/api/admin/users', (req, res) => {
  const user = getAuthUser(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Administrator authorization required' });
  }

  const db = getDatabase();
  return res.json(db.users);
});

app.put('/api/admin/users/:id/approve', (req, res) => {
  const user = getAuthUser(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Administrator authorization required' });
  }

  const { id } = req.params;
  const db = getDatabase();
  const target = db.users.find((u) => u.id === id);
  if (!target) return res.status(404).json({ error: 'User not found' });

  target.isApproved = true;
  saveDatabase(db);
  return res.json({ success: true, user: target });
});

app.put('/api/admin/users/:id/role', (req, res) => {
  const user = getAuthUser(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Administrator authorization required' });
  }

  const { id } = req.params;
  const { newRole } = req.body;
  const db = getDatabase();
  const target = db.users.find((u) => u.id === id);
  if (!target) return res.status(404).json({ error: 'User not found' });

  target.role = newRole;
  target.isApproved = true;
  saveDatabase(db);
  return res.json({ success: true, user: target });
});

// -------------------------------------------------------------
// GEMINI AI PROXY ENDPOINT
// -------------------------------------------------------------

app.post('/api/ai/refine-text', async (req, res) => {
  const { text, taskType, audience, style } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(200).json({ refined: null, message: 'No API key provided' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are a supportive, high-standards communication mentor for young African students and graduates in the RISE Pathway program by R-WEF (Reboot Wellbeing and Empowerment Foundation).
Task: Refine the user's draft for a ${taskType || 'professional statement'}.
Target Audience: ${audience || 'Employer or Practitioner'}
Desired Style: ${style || 'standard'}

User Draft:
"${text}"

CRITICAL ETHICAL INSTRUCTION:
You MUST NEVER invent credentials, degrees, employers, numerical metrics, or experiences not stated or reasonably grounded in the user's text. Your job is solely to polish the structure, use strong active verbs, clarify the problem and outcome, and make the applicant's real capability shine with clarity and confidence.

Return JSON matching:
{
  "refined": "the polished text",
  "whyItWorks": [
    "first reason explaining strength",
    "second reason explaining clarity",
    "third reason explaining tone"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error generating AI refinement:', err);
    return res.status(200).json({ refined: null, error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();


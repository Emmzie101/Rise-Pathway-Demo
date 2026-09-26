import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Gemini AI Proxy Endpoint for Professional Language Studio
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

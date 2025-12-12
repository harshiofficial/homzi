const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 4000;
const DATA_PATH = path.join(__dirname, 'data', 'professionals.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_PATH);
  } catch (err) {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify([]), 'utf-8');
  }
}

async function readProfessionals() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(raw || '[]');
}

async function writeProfessionals(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/professionals', async (req, res) => {
  try {
    const professionals = await readProfessionals();
    const { status } = req.query;
    const filtered = status
      ? professionals.filter((lead) => lead.status === status)
      : professionals;
    filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    res.json(filtered);
  } catch (error) {
    console.error('Failed to read professionals', error);
    res.status(500).json({ message: 'Failed to load professional leads.' });
  }
});

app.post('/api/professionals', async (req, res) => {
  try {
    const requiredFields = ['fullName', 'email', 'phone', 'services'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const professionals = await readProfessionals();
    const newLead = {
      id: Date.now().toString(),
      ...req.body,
      centerId: req.body.centerId ? Number(req.body.centerId) : null,
      services: Array.isArray(req.body.services) ? req.body.services : [],
      status: 'pending',
      availability: req.body.availability || 'Available Today',
      submittedAt: new Date().toISOString()
    };

    professionals.push(newLead);
    await writeProfessionals(professionals);

    res.status(201).json(newLead);
  } catch (error) {
    console.error('Failed to create professional lead', error);
    res.status(500).json({ message: 'Failed to submit professional lead.' });
  }
});

app.patch('/api/professionals/:id', async (req, res) => {
  try {
    const professionals = await readProfessionals();
    const index = professionals.findIndex((lead) => lead.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Professional lead not found.' });
    }

    professionals[index] = {
      ...professionals[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    await writeProfessionals(professionals);
    res.json(professionals[index]);
  } catch (error) {
    console.error('Failed to update professional lead', error);
    res.status(500).json({ message: 'Failed to update professional lead.' });
  }
});

app.listen(PORT, () => {
  console.log(`Homzi API server running on http://localhost:${PORT}`);
});

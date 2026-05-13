import fs from 'fs';
import path from 'path';

type LocalUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
};

type LocalHymn = {
  id: string;
  number: number;
  title: string;
  lyrics: {
    english: string;
    kiswahili: string;
    luo: string;
  };
  sourceUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt?: string;
};

type LocalEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  createdAt: string;
  updatedAt?: string;
};

type LocalCampmeeting = {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  theme: string;
  description: string;
  speakers: string[];
  capacity: number;
  registrationOpen: boolean;
  createdAt: string;
  updatedAt?: string;
};

type LocalDb = {
  siteInfo: {
    siteTitle: string;
    homepageHeadline: string;
    homepageSubtext: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
  };
  users: LocalUser[];
  hymns: LocalHymn[];
  events: LocalEvent[];
  campmeetings: LocalCampmeeting[];
};

const dbPath = path.join(process.cwd(), '.gweno-local-db.json');

const defaultData: LocalDb = {
  siteInfo: {
    siteTitle: 'Gweno Kipodi SDA Church',
    homepageHeadline: 'Welcome to Gweno Kipodi SDA Church',
    homepageSubtext: 'A place of worship, community, and spiritual growth.',
    contactEmail: 'info@gwenokipodichurch.org',
    contactPhone: '+254 700 000 000',
    address: 'Gweno Kipodi SDA Church, Kisii County, Kenya',
  },
  users: [],
  hymns: [],
  events: [],
  campmeetings: [],
};

function readDb(): LocalDb {
  try {
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(content) as LocalDb;
    }
  } catch (error) {
    console.error('Unable to read local DB file:', error);
  }

  return defaultData;
}

function writeDb(db: LocalDb): LocalDb {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Unable to write local DB file:', error);
  }
  return db;
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getLocalSiteInfo() {
  return readDb().siteInfo;
}

export function saveLocalSiteInfo(payload: Partial<LocalDb['siteInfo']>) {
  const db = readDb();
  db.siteInfo = {
    ...db.siteInfo,
    ...payload,
  };
  return writeDb(db).siteInfo;
}

export function getLocalUsers() {
  return readDb().users;
}

export function addLocalUser(payload: Partial<LocalUser>) {
  const db = readDb();
  const newUser: LocalUser = {
    id: payload.id || createId(),
    name: payload.name || 'Admin User',
    email: payload.email || 'admin@example.com',
    role: payload.role || 'editor',
    status: payload.status || 'active',
    createdAt: new Date().toISOString(),
    updatedAt: payload.updatedAt,
  };
  db.users.unshift(newUser);
  writeDb(db);
  return newUser;
}

export function updateLocalUser(id: string, payload: Partial<LocalUser>) {
  const db = readDb();
  const existing = db.users.find((user) => user.id === id);
  if (!existing) {
    throw new Error('User not found');
  }
  Object.assign(existing, {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
  writeDb(db);
  return existing;
}

export function deleteLocalUser(id: string) {
  const db = readDb();
  db.users = db.users.filter((user) => user.id !== id);
  writeDb(db);
  return true;
}

// Hymns
export function getLocalHymns() {
  return readDb().hymns.sort((a, b) => a.number - b.number);
}

export function addLocalHymn(payload: Partial<LocalHymn>) {
  const db = readDb();
  const newHymn: LocalHymn = {
    id: payload.id || createId(),
    number: payload.number || 1,
    title: payload.title || 'Hymn',
    lyrics: payload.lyrics || { english: '', kiswahili: '', luo: '' },
    sourceUrl: payload.sourceUrl,
    imageUrl: payload.imageUrl,
    videoUrl: payload.videoUrl,
    createdAt: new Date().toISOString(),
  };
  db.hymns.push(newHymn);
  writeDb(db);
  return newHymn;
}

export function updateLocalHymn(id: string, payload: Partial<LocalHymn>) {
  const db = readDb();
  const existing = db.hymns.find((hymn) => hymn.id === id);
  if (!existing) {
    throw new Error('Hymn not found');
  }
  Object.assign(existing, {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
  writeDb(db);
  return existing;
}

export function deleteLocalHymn(id: string) {
  const db = readDb();
  db.hymns = db.hymns.filter((hymn) => hymn.id !== id);
  writeDb(db);
  return true;
}

// Events
export function getLocalEvents() {
  return readDb().events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function addLocalEvent(payload: Partial<LocalEvent>) {
  const db = readDb();
  const newEvent: LocalEvent = {
    id: payload.id || createId(),
    title: payload.title || 'Event',
    date: payload.date || new Date().toISOString(),
    time: payload.time || '00:00',
    location: payload.location || '',
    description: payload.description || '',
    category: payload.category,
    createdAt: new Date().toISOString(),
  };
  db.events.push(newEvent);
  writeDb(db);
  return newEvent;
}

export function updateLocalEvent(id: string, payload: Partial<LocalEvent>) {
  const db = readDb();
  const existing = db.events.find((event) => event.id === id);
  if (!existing) {
    throw new Error('Event not found');
  }
  Object.assign(existing, {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
  writeDb(db);
  return existing;
}

export function deleteLocalEvent(id: string) {
  const db = readDb();
  db.events = db.events.filter((event) => event.id !== id);
  writeDb(db);
  return true;
}

// Campmeetings
export function getLocalCampmeetings() {
  return readDb().campmeetings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function addLocalCampmeeting(payload: Partial<LocalCampmeeting>) {
  const db = readDb();
  const newCampmeeting: LocalCampmeeting = {
    id: payload.id || createId(),
    title: payload.title || 'Campmeeting',
    location: payload.location || '',
    date: payload.date || new Date().toISOString(),
    duration: payload.duration || '',
    theme: payload.theme || '',
    description: payload.description || '',
    speakers: payload.speakers || [],
    capacity: payload.capacity || 0,
    registrationOpen: payload.registrationOpen ?? true,
    createdAt: new Date().toISOString(),
  };
  db.campmeetings.push(newCampmeeting);
  writeDb(db);
  return newCampmeeting;
}

export function updateLocalCampmeeting(id: string, payload: Partial<LocalCampmeeting>) {
  const db = readDb();
  const existing = db.campmeetings.find((cm) => cm.id === id);
  if (!existing) {
    throw new Error('Campmeeting not found');
  }
  Object.assign(existing, {
    ...payload,
    updatedAt: new Date().toISOString(),
  });
  writeDb(db);
  return existing;
}

export function deleteLocalCampmeeting(id: string) {
  const db = readDb();
  db.campmeetings = db.campmeetings.filter((cm) => cm.id !== id);
  writeDb(db);
  return true;
}

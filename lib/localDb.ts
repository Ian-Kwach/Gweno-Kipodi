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

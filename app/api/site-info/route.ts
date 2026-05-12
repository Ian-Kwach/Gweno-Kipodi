import { NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebaseAdmin';

const siteInfoDoc = adminDb.doc('siteInfo/main');

export async function GET() {
  try {
    const snapshot = await siteInfoDoc.get();
    if (!snapshot.exists) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    return NextResponse.json({ data: snapshot.data() }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to load site info' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await siteInfoDoc.set(payload, { merge: true });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to save site info' }, { status: 500 });
  }
}

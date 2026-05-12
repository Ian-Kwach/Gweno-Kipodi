import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../lib/firebaseAdmin';
import { getLocalSiteInfo, saveLocalSiteInfo } from '../../../lib/localDb';

const siteInfoDoc = adminDb?.doc('siteInfo/main');

export async function GET() {
  try {
    if (!firebaseConfigured || !adminDb || !siteInfoDoc) {
      return NextResponse.json({ data: getLocalSiteInfo(), source: 'local' }, { status: 200 });
    }

    const snapshot = await siteInfoDoc.get();
    if (!snapshot.exists) {
      return NextResponse.json({ data: null }, { status: 200 });
    }
    return NextResponse.json({ data: snapshot.data() }, { status: 200 });
  } catch (error) {
    console.error('site-info GET error:', error);
    return NextResponse.json({ error: 'Unable to load site info', detail: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb || !siteInfoDoc) {
      return NextResponse.json({ success: true, data: saveLocalSiteInfo(payload), source: 'local' }, { status: 200 });
    }
    await siteInfoDoc.set(payload, { merge: true });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('site-info POST error:', error);
    return NextResponse.json({ error: 'Unable to save site info', detail: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb || !siteInfoDoc) {
      return NextResponse.json({ success: true, data: saveLocalSiteInfo(payload), source: 'local' }, { status: 200 });
    }
    await siteInfoDoc.set(payload, { merge: true });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('site-info PUT error:', error);
    return NextResponse.json({ error: 'Unable to update site info', detail: String(error) }, { status: 500 });
  }
}

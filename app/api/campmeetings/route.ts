import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../lib/firebaseAdmin';
import { getLocalCampmeetings, addLocalCampmeeting } from '../../../lib/localDb';

const campmeetingsCollection = adminDb?.collection('campmeetings');

export async function GET() {
  try {
    if (!firebaseConfigured || !campmeetingsCollection) {
      return NextResponse.json({ data: getLocalCampmeetings(), source: 'local' }, { status: 200 });
    }
    const snapshot = await campmeetingsCollection.orderBy('date', 'desc').get();
    const campmeetings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: campmeetings }, { status: 200 });
  } catch (error) {
    console.error('campmeetings GET error:', error);
    return NextResponse.json({ data: getLocalCampmeetings(), source: 'local' }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !campmeetingsCollection) {
      return NextResponse.json({ success: true, data: addLocalCampmeeting(payload), source: 'local' }, { status: 201 });
    }
    const docRef = await campmeetingsCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('campmeetings POST error:', error);
    return NextResponse.json({ error: 'Unable to save campmeeting', detail: String(error) }, { status: 500 });
  }
}
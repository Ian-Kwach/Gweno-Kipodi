import { NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebaseAdmin';

const campmeetingsCollection = adminDb.collection('campmeetings');

export async function GET() {
  try {
    const snapshot = await campmeetingsCollection.orderBy('date', 'desc').get();
    const campmeetings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: campmeetings }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to load campmeetings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const docRef = await campmeetingsCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save campmeeting' }, { status: 500 });
  }
}
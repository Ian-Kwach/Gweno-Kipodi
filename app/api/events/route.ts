import { NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebaseAdmin';

const eventsCollection = adminDb?.collection('events');

export async function GET() {
  try {
    if (!eventsCollection) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 500 });
    }
    const snapshot = await eventsCollection.orderBy('date', 'desc').get();
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: events }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to load events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!eventsCollection) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 500 });
    }
    const payload = await request.json();
    const docRef = await eventsCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save event' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../lib/firebaseAdmin';
import { getLocalEvents, addLocalEvent } from '../../../lib/localDb';

const eventsCollection = adminDb?.collection('events');

export async function GET() {
  try {
    if (!firebaseConfigured || !eventsCollection) {
      return NextResponse.json({ data: getLocalEvents(), source: 'local' }, { status: 200 });
    }
    const snapshot = await eventsCollection.orderBy('date', 'desc').get();
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: events }, { status: 200 });
  } catch (error) {
    console.error('events GET error:', error);
    return NextResponse.json({ data: getLocalEvents(), source: 'local' }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !eventsCollection) {
      return NextResponse.json({ success: true, data: addLocalEvent(payload), source: 'local' }, { status: 201 });
    }
    const docRef = await eventsCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('events POST error:', error);
    return NextResponse.json({ error: 'Unable to save event', detail: String(error) }, { status: 500 });
  }
}
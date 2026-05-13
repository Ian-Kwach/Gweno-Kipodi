import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../lib/firebaseAdmin';
import { getLocalHymns, addLocalHymn } from '../../../lib/localDb';

const hymnsCollection = adminDb?.collection('hymns');

export async function GET() {
  try {
    if (!firebaseConfigured || !hymnsCollection) {
      return NextResponse.json({ data: getLocalHymns(), source: 'local' }, { status: 200 });
    }
    const snapshot = await hymnsCollection.orderBy('number').get();
    const hymns = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: hymns }, { status: 200 });
  } catch (error) {
    console.error('hymns GET error:', error);
    return NextResponse.json({ data: getLocalHymns(), source: 'local' }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !hymnsCollection) {
      return NextResponse.json({ success: true, data: addLocalHymn(payload), source: 'local' }, { status: 201 });
    }
    const docRef = await hymnsCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('hymns POST error:', error);
    return NextResponse.json({ error: 'Unable to save hymn', detail: String(error) }, { status: 500 });
  }
}
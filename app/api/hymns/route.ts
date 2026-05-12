import { NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebaseAdmin';

const hymnsCollection = adminDb.collection('hymns');

export async function GET() {
  try {
    const snapshot = await hymnsCollection.orderBy('number').get();
    const hymns = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: hymns }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to load hymns' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const docRef = await hymnsCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save hymn' }, { status: 500 });
  }
}
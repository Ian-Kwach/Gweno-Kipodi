import { NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebaseAdmin';

const usersCollection = adminDb.collection('users');

export async function GET() {
  try {
    const snapshot = await usersCollection.orderBy('createdAt', 'desc').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json({ data: users }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to load users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const docRef = await usersCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save user' }, { status: 500 });
  }
}
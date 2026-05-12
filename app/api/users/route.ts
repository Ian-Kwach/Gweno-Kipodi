import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../lib/firebaseAdmin';
import { getLocalUsers, addLocalUser } from '../../../lib/localDb';

const usersCollection = adminDb?.collection('users');

export async function GET() {
  try {
    if (!firebaseConfigured || !adminDb || !usersCollection) {
      return NextResponse.json({ data: getLocalUsers(), source: 'local' }, { status: 200 });
    }

    const snapshot = await usersCollection.orderBy('createdAt', 'desc').get();
    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt;
      return {
        id: doc.id,
        ...data,
        createdAt: createdAt?.toDate ? createdAt.toDate().toISOString() : createdAt,
      };
    });
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error('users GET error:', error);
    return NextResponse.json({ error: 'Unable to load users', detail: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb || !usersCollection) {
      const user = addLocalUser(payload);
      return NextResponse.json({ success: true, id: user.id }, { status: 201 });
    }

    const docRef = await usersCollection.add({
      ...payload,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('users POST error:', error);
    return NextResponse.json({ error: 'Unable to save user', detail: String(error) }, { status: 500 });
  }
}
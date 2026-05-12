import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../../lib/firebaseAdmin';
import { updateLocalUser, deleteLocalUser } from '../../../../lib/localDb';

const usersCollection = adminDb?.collection('users');

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb || !usersCollection) {
      const updated = updateLocalUser(id, payload);
      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    }
    const userRef = usersCollection.doc(id);
    await userRef.update({
      ...payload,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('users/[id] PUT error:', error);
    return NextResponse.json({ error: 'Unable to update user', detail: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!firebaseConfigured || !adminDb || !usersCollection) {
      deleteLocalUser(id);
      return NextResponse.json({ success: true }, { status: 200 });
    }
    await usersCollection.doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('users/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Unable to delete user', detail: String(error) }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../../lib/firebaseAdmin';
import { updateLocalCampmeeting, deleteLocalCampmeeting } from '../../../../lib/localDb';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb) {
      return NextResponse.json({ success: true, data: updateLocalCampmeeting(id, payload), source: 'local' }, { status: 200 });
    }
    const campmeetingRef = adminDb.collection('campmeetings').doc(id);
    await campmeetingRef.update({
      ...payload,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('campmeetings/[id] PUT error:', error);
    return NextResponse.json({ error: 'Unable to update campmeeting', detail: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!firebaseConfigured || !adminDb) {
      deleteLocalCampmeeting(id);
      return NextResponse.json({ success: true, source: 'local' }, { status: 200 });
    }
    await adminDb.collection('campmeetings').doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('campmeetings/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Unable to delete campmeeting', detail: String(error) }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../../lib/firebaseAdmin';
import { updateLocalEvent, deleteLocalEvent } from '../../../../lib/localDb';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb) {
      return NextResponse.json({ success: true, data: updateLocalEvent(id, payload), source: 'local' }, { status: 200 });
    }
    const eventRef = adminDb.collection('events').doc(id);
    await eventRef.update({
      ...payload,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('events/[id] PUT error:', error);
    return NextResponse.json({ error: 'Unable to update event', detail: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!firebaseConfigured || !adminDb) {
      deleteLocalEvent(id);
      return NextResponse.json({ success: true, source: 'local' }, { status: 200 });
    }
    await adminDb.collection('events').doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('events/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Unable to delete event', detail: String(error) }, { status: 500 });
  }
}
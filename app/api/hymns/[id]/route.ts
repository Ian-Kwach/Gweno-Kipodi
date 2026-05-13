import { NextResponse } from 'next/server';
import { adminDb, firebaseConfigured } from '../../../../lib/firebaseAdmin';
import { updateLocalHymn, deleteLocalHymn } from '../../../../lib/localDb';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const payload = await request.json();
    if (!firebaseConfigured || !adminDb) {
      return NextResponse.json({ success: true, data: updateLocalHymn(id, payload), source: 'local' }, { status: 200 });
    }
    const hymnRef = adminDb.collection('hymns').doc(id);
    await hymnRef.update({
      ...payload,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('hymns/[id] PUT error:', error);
    return NextResponse.json({ error: 'Unable to update hymn', detail: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!firebaseConfigured || !adminDb) {
      deleteLocalHymn(id);
      return NextResponse.json({ success: true, source: 'local' }, { status: 200 });
    }
    await adminDb.collection('hymns').doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('hymns/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Unable to delete hymn', detail: String(error) }, { status: 500 });
  }
}
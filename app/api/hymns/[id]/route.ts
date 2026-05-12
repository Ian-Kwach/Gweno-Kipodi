import { NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebaseAdmin';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 500 });
    }
    const payload = await request.json();
    const hymnRef = adminDb.collection('hymns').doc(id);
    await hymnRef.update({
      ...payload,
      updatedAt: new Date(),
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to update hymn' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 500 });
    }
    await adminDb.collection('hymns').doc(id).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to delete hymn' }, { status: 500 });
  }
}